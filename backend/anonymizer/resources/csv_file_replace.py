from flask_restful import reqparse, Resource
from flask_restful_swagger import swagger
from flask import Response
from common.util import textReplace, huggingface_model, dict_converter, regexReplace
from werkzeug.datastructures import FileStorage
import pandas as pd
from pandas._libs import lib
from pandas.core.dtypes.missing import isna
import pandas.io.common
import numpy as np

parser = reqparse.RequestParser()
parser.add_argument("inputFile", type=FileStorage, location="files")
parser.add_argument("replaceTerms", location="form")
parser.add_argument("autoReplace", location="form")
parser.add_argument("autoReplaceTerms", location="form")


def regex_text_replace(inputText: str, replaceTerms: dict, autoReplaceTerms: dict):
    inputText = regexReplace(inputText, autoReplaceTerms)[0]
    return textReplace(inputText, replaceTerms)


def column_replace(
    array, replaceTerms: dict, autoReplaceTerms: dict, autoReplace: bool
):
    # map and convert null cells
    arr = np.asarray(array, dtype=object)
    mask = isna(arr)
    map_convert = not np.all(mask)

    # if autoReplace, then scan the row for potential replaceTerms
    if autoReplace:
        temp_arr = ["" if x is np.nan else x for x in arr]
        cleanedAutoReplaceTerms = huggingface_model(",".join((temp_arr)))
        replaceTerms = dict_converter(cleanedAutoReplaceTerms, autoReplaceTerms)

        # lambda text and regex replace function
        f = lambda x: regex_text_replace(x, replaceTerms, autoReplaceTerms)
    else:
        # lambda textReplace function
        f = lambda x: textReplace(x, replaceTerms)

    # apply replaceTerms
    result = lib.map_infer_mask(arr, f, mask.view(np.uint8), map_convert)

    return result


class CSVFileReplace(Resource):
    "Simple text replace anonymization tool for CSV Files"

    @swagger.operation(
        responseClass="text/csv",
        parameters=[
            {
                "name": "inputFile",
                "description": "Input CSV file that the user wishes to redact sensitive information from. \
                                This parameter must contain a valid file upload. Any proper CSV file (regardless of its formatting) will be accepted and anonymized",
                "required": True,
                "allowMultiple": False,
                "dataType": "String",
            },
            {
                "name": "autoReplace",
                "description": "Boolean switch for the user to decide if they want to manually specify their anonymization terms, or have our algorithm do it for them. \
                                True -> smart replace and False -> manual replace.",
                "required": "False (autoReplace=False if unspecified)",
                "allowMultiple": False,
                "dataType": "Boolean",
            },
            {
                "name": "replaceTerms",
                "description": "Dictionary of all all key-term pairs that the user wishes to anonymize. This parameter is only utilized if autoReplace=True.",
                "required": False,
                "allowMultiple": False,
                "dataType": "Object (Dictionary)",
            },
            {
                "name": "autoReplaceTerms",
                "description": "Dictionary specifying the terms that the user wants our algorithm to find, and what they should be replaced to. \
                                The available keys are specified in the following set {names, org, location, phone_number, credit_card, postal_code}",
                "required": False,
                "allowMultiple": False,
                "dataType": "Object (Dictionary)",
            },
        ],
        responseMessages=[
            {"code": 400, "message": "Invalid csv formatting"},
            {"code": 400, "message": "Missing replaceTerms"},
            {"code": 400, "message": "Missing autoReplaceTerms"},
            {"code": 200, "message": "[ANONYMIZED USER CSV FILE]"},
        ],
    )
    def post(self):
        # Collect input
        args = parser.parse_args()
        inputFile = args["inputFile"]
        autoReplace = args["autoReplace"] or False
        replaceTerms = eval(args["replaceTerms"] or "{}")
        autoReplaceTerms = eval(args["autoReplaceTerms"] or "{}")

        if autoReplace == "true" or autoReplace == "True":
            autoReplace = True
        elif autoReplace == "false" or autoReplace == "False":
            autoReplace = False

        # Read from the csv and input into a dataset
        try:
            data = pd.read_csv(inputFile, dtype=str, header=None)
        except pandas.errors.EmptyDataError:
            return {"message": "Invalid csv formatting"}, 400

        # error checking
        if not autoReplace and not replaceTerms:
            return {"message": "Missing replaceTerms"}, 400
        elif autoReplace and not autoReplaceTerms:
            return {"message": "Missing auto replacement terms"}, 400

        # Update row by row
        df_updated = data.apply(
            lambda m: pd.Series(
                column_replace(
                    m._data.array, replaceTerms, autoReplaceTerms, autoReplace
                )
            )
        )

        return Response(
            df_updated.to_csv(index=False, header=False),
            mimetype="text/csv",
            headers={"Content-disposition": "attachment; filename=filename.csv"},
        )
