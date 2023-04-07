import tempfile

from flask import jsonify, send_file
from flask_restful import reqparse, Resource
from flask_restful_swagger import swagger
from werkzeug.datastructures import FileStorage

from common.util import textReplace, huggingface_model, dict_converter, regexReplace

parser = reqparse.RequestParser()
parser.add_argument("inputTextFile", type=FileStorage, location="files")
# this endpoint will take a .txt file rather than a string
parser.add_argument("replaceTerms", location="form")
parser.add_argument("autoReplace", location="form")
parser.add_argument("autoReplaceTerms", location="form")


class TXTFileReplace(Resource):
    "Simple text replace anonymization tool for TXT files"

    @swagger.operation(
        responseClass="text",
        parameters=[
            {
                "name": "inputTextFile ",
                "description": "Input TXT file that the user wishes to redact sensitive information from. \
                                This parameter must contain a valid file upload. Any proper TXT file (regardless of its formatting) will be accepted and anonymized",
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
                "description": "Dictionary of all all key-term pairs that the user wishes to anonymize. This parameter is only utilized if autoReplace=False.",
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
            {"code": 400, "message": "Missing replaceTerms"},
            {"code": 400, "message": "Missing autoReplaceTerms"},
            {"code": 400, "message": "Missing parameter(s)"},
            {"code": 200, "message": "[ANONYMIZED USER TXT FILE]"},
        ],
    )
    def post(self):
        args = parser.parse_args()
        inputTextFile = args["inputTextFile"]
        autoReplace = args["autoReplace"] or False

        if autoReplace == "true" or autoReplace == "True":
            autoReplace = True
        elif autoReplace == "false" or autoReplace == "False":
            autoReplace = False

        if autoReplace:
            replaceTerms = None
            autoReplaceTerms = eval(args["autoReplaceTerms"] or "{}")
        else:
            autoReplaceTerms = None
            replaceTerms = eval(args["replaceTerms"] or "{}")

        # error checking
        if not autoReplace and not replaceTerms:
            return {"message": "Missing replaceTerms"}, 400
        elif autoReplace and not autoReplaceTerms:
            return {"message": "Missing auto replacement terms"}, 400

        print(inputTextFile)
        #  (not autoReplace and not replaceTerms) or not ( autoReplace and not autoReplaceTerms)
        if not inputTextFile or inputTextFile == "":
            return {"message": "Missing parameter(s)"}, 400

        # get input text from the txt file
        inputText = inputTextFile.read()
        # call replacement function
        decoded_inputText = inputText.decode('utf-8"')
        if not autoReplace:
            outputText = textReplace(decoded_inputText, replaceTerms)
        else:
            decoded_inputText, swapDict = regexReplace(decoded_inputText, autoReplaceTerms)[:2]
            terms = huggingface_model(decoded_inputText)
            terms = dict_converter(terms, autoReplaceTerms)
            terms.update(swapDict)
            outputText = textReplace(decoded_inputText, terms)
        tmp = tempfile.TemporaryFile()
        b = bytes(outputText, "utf-8")
        tmp.write(b)
        tmp.seek(0)

        return send_file(tmp, attachment_filename="anonymized.txt")

        # return jsonify(inputTextFile)
