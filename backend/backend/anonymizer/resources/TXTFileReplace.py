import tempfile

from flask import jsonify, send_file
from flask_restful import reqparse, Resource
from flask_restful_swagger import swagger
from werkzeug.datastructures import FileStorage

from common.util import textReplace

parser = reqparse.RequestParser()
parser.add_argument('inputTextFile', type=FileStorage, location='files')
# this endpoint will take a .txt file rather than a string
parser.add_argument('replaceTerms', location='form')

class TXTFileReplace(Resource):
    "Simple text replace anonymization tool for TXT files"
    @swagger.operation(
        responseClass='text',
        parameters=[
            {
                "name": "inputTextFile",
                "description": "TXT file that the user wises to anonymize",
                "required": True,
                "allowMultiple": False,
                "dataType": 'text'
            },
            {
                "name": "replaceTerms",
                "description": "Dictionary of all all key-term pairs that the user wishes to anonymize",
                "required": False,
                "allowMultiple": False,
                "dataType": 'Dict'
            }
            ],
        responseMessages=[
            {
                "code": 200,
                "message": "[ANONYMIZED USER TXT FILE]"
            },
            {
                "code": 400,
                "message": "missing parameter(s)"
            }
            ]
        )
    def post(self):
        args = parser.parse_args()
        inputTextFile = args['inputTextFile']
        replaceTerms = eval(args['replaceTerms'])

        print(inputTextFile)
        if not inputTextFile or not replaceTerms or inputTextFile == "":
            return {'message': 'missing parameter(s)'}, 400

        # get input text from the txt file
        inputText = inputTextFile.read()
        # call replacement function
        decoded_inputText = inputText.decode('utf-8"')
        outputText = textReplace(decoded_inputText, replaceTerms)

        tmp = tempfile.TemporaryFile()
        b = bytes(outputText, 'utf-8')
        tmp.write(b)
        tmp.seek(0)
    
        return send_file(tmp, attachment_filename='anonymized.txt')

        #return jsonify(inputTextFile)
