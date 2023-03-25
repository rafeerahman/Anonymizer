from flask_restful import reqparse, Resource
from flask_restful_swagger import swagger
from flask import Response
from common.util import textReplace, huggingface_model, dict_converter
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

def advanced_replace(array, replaceTerms):
    f = lambda x: textReplace(x, replaceTerms)

    arr = np.asarray(array, dtype=object)
    mask = isna(arr)
    map_convert = not np.all(mask)

    result = lib.map_infer_mask(arr, f, mask.view(np.uint8), map_convert)

    return result

def smart_replace(array, autoReplaceTerms):
    arr = np.asarray(array, dtype=object)
    mask = isna(arr)
    map_convert = not np.all(mask)
    
    cleanedAutoReplaceTerms = huggingface_model(','.join(arr))
    autoReplaceTerms = dict_converter(cleanedAutoReplaceTerms, autoReplaceTerms)   

    f = lambda x: textReplace(x, autoReplaceTerms)
    
    result = lib.map_infer_mask(arr, f, mask.view(np.uint8), map_convert)

    return result

class CSVFileReplace(Resource):
    "Simple text replace anonymization tool for CSV Files"

    @swagger.operation(
        responseClass="text/csv",
        parameters=[
            {
                "name": "inputFile",
                "description": "Uploaded CSV file that the user wises to anonymize",
                "required": True,
                "allowMultiple": False,
                "dataType": "text/csv",
            },
            {
                "name": "replaceTerms",
                "description": "Dictionary of all all key-term pairs that the user wishes to anonymize",
                "required": False,
                "allowMultiple": False,
                "dataType": "Dict",
            },
        ],
        responseMessages=[
            {"code": 200, "message": "[ANONYMIZED USER CSV FILE]"},
            {"code": 400, "message": "invalid csv formatting"},
        ],
    )
    def post(self):
        # Collect the input parameters
        args = parser.parse_args()
        inputFile = args["inputFile"]
        autoReplace = args["autoReplace"] or False
        replaceTerms = eval(args["replaceTerms"] or "{}")
        autoReplaceTerms = eval(args["autoReplaceTerms"] or "{}")

        # Read from the csv and input into a dataset
        try:
            data = pd.read_csv(inputFile, dtype=str, header=None)
        except pandas.errors.EmptyDataError:
            return {"message": "invalid csv formatting"}, 400
        
        # error checking
        if (not autoReplace and not replaceTerms):
            return {"message": "missing replaceTerms"}, 400
        elif (autoReplace and not autoReplaceTerms):
            return {"message": "missing autoReplaceTerms"}, 400

        # Update row by row
        if autoReplace:
            df_updated = data.apply(
                lambda m: pd.Series(smart_replace(m._data.array, autoReplaceTerms))
            )
        else:
            df_updated = data.apply(
                lambda m: pd.Series(advanced_replace(m._data.array, replaceTerms))
            )

        return Response(
            df_updated.to_csv(index=False, header=False),
            mimetype="text/csv",
            headers={"Content-disposition": "attachment; filename=filename.csv"},
        )
