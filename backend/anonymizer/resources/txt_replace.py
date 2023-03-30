from flask_restful import reqparse, Resource
from flask_restful_swagger import swagger
from common.util import textReplace, huggingface_model, dict_converter, regexReplace
import re

parser = reqparse.RequestParser()
parser.add_argument("inputText")
parser.add_argument("replaceTerms")
parser.add_argument("autoReplace")
parser.add_argument("autoReplaceTerms")


class TXTReplace(Resource):
    "Simple text-replace anonymization tool for strings"

    @swagger.operation(
        responseClass="json",
        parameters=[
            {
                "name": "inputText",
                "description": "String containing text that the user wises to anonymize.",
                "required": True,
                "allowMultiple": False,
                "dataType": "String",
            },
            {
                "name": "replaceTerms",
                "description": "Dictionary of all all key-term pairs that the user wishes to anonymize.",
                "required": False,
                "allowMultiple": False,
                "dataType": "Dict",
            },
        ],
        responseMessages=[
            {"code": 200, "message": "[ANONYMIZED USER TEXT]"},
            {"code": 400, "message": "missing parameter(s)"},
        ],
    )
    def post(self):
        # collect input
        args = parser.parse_args()
        inputText = args["inputText"] or ""
        autoReplace = args["autoReplace"] or False
        replaceTerms = eval(args["replaceTerms"] or "{}")
        autoReplaceTerms = eval(args["autoReplaceTerms"] or "{}")

        if autoReplace == "true" or autoReplace == "True":
            autoReplace = True
        elif autoReplace == "false" or autoReplace == "False":
            autoReplace = False

        # error checking
        if inputText == "":
            return {"message": "Invalid input"}, 400
        if not autoReplace and not replaceTerms:
            return {"message": "Missing replaceTerms"}, 400
        elif autoReplace and not autoReplaceTerms:
            return {"message": "Missing auto replacement terms"}, 400

        # call replacement function
        if autoReplace:
            # perform regex sweep
            inputText, regexResult = regexReplace(inputText, autoReplaceTerms)

            # search for terms to replace
            cleanedAutoReplaceTerms = huggingface_model(inputText)

            # ensure match was found
            if not cleanedAutoReplaceTerms and not regexResult:
                # (Rafee): Changed to custom error code, so we can notify the user of the message on frontend. Might be good to put these in a errors.json file but its fine for now
                return {
                    "message": "We were unable to detect any replaceable terms"
                }, 630

            # apply found terms to specified mapping, and then apply mapping to inputText
            replaceTerms = dict_converter(cleanedAutoReplaceTerms, autoReplaceTerms)

        # replace inputText
        outputText = textReplace(inputText, replaceTerms)

        return {"message": outputText}, 200, {"Access-Control-Allow-Origin": "*"}
