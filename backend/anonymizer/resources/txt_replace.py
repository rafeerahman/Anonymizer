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
    This endpoint allows users to easily mask or redact sensitive information from text-based data.
    """

    @swagger.operation(
        notes="Users are given the option to manually specify a set of key-value replacement terms, or use our detection algorithm to do so automatically.",
        responseClass="json",
        parameters=[
            {
                "name": "inputText",
                "description": "Input string that the user wishes to redact sensitive information from. \
                                This parameter is able to contain all character data that would be accepted in the standard Python string. \
                                (alphanumerical characters, punctuation, newline characters, etc)",
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
            {"code": 200, "message": "[ANONYMIZED USER TEXT]"},
            {"code": 400, "message": "Invalid input"},
            {"code": 400, "message": "Missing replaceTerms"},
            {"code": 400, "message": "Missing auto replacement terms"},
            {"code": 630, "message": "We were unable to detect any replaceable terms"},
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
            inputText, swapDict, regexResult = regexReplace(inputText, autoReplaceTerms)

            # search for terms to replace
            cleanedAutoReplaceTerms = huggingface_model(inputText)

            # ensure match was found
            if not cleanedAutoReplaceTerms and not regexResult:
                return {
                    "message": "We were unable to detect any replaceable terms"
                }, 630

            # apply found terms to specified mapping, and then apply mapping to inputText
            replaceTerms = dict_converter(cleanedAutoReplaceTerms, autoReplaceTerms)
            replaceTerms.update(swapDict)

        # replace inputText
        outputText = textReplace(inputText, replaceTerms)

        return {"message": outputText}, 200, {"Access-Control-Allow-Origin": "*"}
