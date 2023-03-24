from flask_restful import reqparse, Resource
from flask_restful_swagger import swagger
from common.util import textReplace, huggingface_model
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
        args = parser.parse_args()
        inputText = args["inputText"]
        replaceTerms = eval(args["replaceTerms"])
        autoReplace = args["autoReplace"]
        autoReplaceTerms = eval(args["autoReplaceTerms"])

        # error checking
        # if not replaceTerms or inputText == "":
        #     return {"message": "missing parameter(s)"}, 400

        # call replacement function
        if autoReplace:
            cleanedAutoReplaceTerms = huggingface_model(inputText)
            cleanedAutoReplaceTerms = {key: autoReplaceTerms[value] for key, value in cleanedAutoReplaceTerms.items() if value in autoReplaceTerms}
            outputText = textReplace(inputText, cleanedAutoReplaceTerms)
        else:
            outputText = textReplace(inputText, replaceTerms)

        return {"message": outputText}, 200, {"Access-Control-Allow-Origin": "*"}
