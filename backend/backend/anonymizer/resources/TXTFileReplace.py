import tempfile

from flask import jsonify, send_file
from flask_restful import reqparse, Resource
from flask_restful_swagger import swagger
from werkzeug.datastructures import FileStorage

from common.util import textReplace
import re

parser = reqparse.RequestParser()
parser.add_argument('inputTextFile', type=FileStorage, location='files')
# this endpoint will take a .txt file rather than a string
parser.add_argument('replaceTerms', location='form')

class TXTFileReplace(Resource):
    # "Simple text replace anonymization tool"
    # @swagger.operation(
    #     responseClass='json',
    #     parameters=[
    #         {
    #             "name": "inputText",
    #             "description": "String containing text that the user wises to anonymize",
    #             "required": True,
    #             "allowMultiple": False,
    #             "dataType": 'String' #TODO: modify the swagger to .txt file
    #         },
    #         {
    #             "name": "replaceTerms",
    #             "description": "Dictionary of all all key-term pairs that the user wishes to anonymize",
    #             "required": False,
    #             "allowMultiple": False,
    #             "dataType": 'Dict'
    #         }
    #     ],
    #     responseMessages=[
    #         {
    #             "code": 200,
    #             "message": "[ANONYMIZED USER TEXT]"
    #         },
    #         {
    #             "code": 400,
    #             "message": "missing parameter(s)"
    #         }
    #     ]
    # )
    def post(self):
        args = parser.parse_args()
        inputTextFile = args['inputTextFile']
        replaceTerms = eval(args['replaceTerms'])

        print(inputTextFile)
        print(replaceTerms)
        if not replaceTerms or inputTextFile == "":
            return {'message': 'missing parameter(s)'}, 400

        # get input text from the txt file
        inputText = inputTextFile.read()
        print("printing inputText")
        print(inputText)
        # call replacement function
        decoded_inputText = inputText.decode('utf-8"')
        print(decoded_inputText)
        outputText = textReplace(decoded_inputText, replaceTerms)
        # TODO: return .txt file

        tmp = tempfile.TemporaryFile()
        b = bytes(outputText, 'utf-8')
        tmp.write(b)
        tmp.seek(0)
        return send_file(tmp, attachment_filename='anonymized.txt')

        #return jsonify(inputTextFile)
