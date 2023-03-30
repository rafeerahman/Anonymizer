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
    """
    This endpoint allows users to easily mask or redact sensitive information from text-based data. \
    Users have the option to specify a set of desired key-value replacement terms, or have it automatically detected.
    """
    @swagger.operation(
        responseClass="json",
        parameters=[
            {
                "name": "inputText",
                "description": "Non-anonymized string that the user wishes to redact sensitive information from. \
                                This parameter is able to contain all character data that would be accepted in the standard Python string. \
                                (alphanumerical characters, punctuation, newline characters, etc)",
                "required": True,
                "allowMultiple": False,
                "dataType": "String",
            },
            {
                "name": "autoReplace",
                "description": "Boolean switch where True implies that we will be performing smart replace, and False implies that the user will be specifying their replaceTerms",
                "required": False,
                "allowMultiple": False,
                "dataType": "Bool",
            },
            {
                "name": "replaceTerms",
                "description": "Dictionary of all all key-term pairs that the user wishes to anonymize.",
                "required": False,
                "allowMultiple": False,
                "dataType": "Dict",
            },
            {
                "name": "autoReplaceTerms",
                "description": "Dictionary with keys from the following set {names, org, location, phone_number, credit_card, postal_code}",
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
