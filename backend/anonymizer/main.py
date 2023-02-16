from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)


#TODO: Add logic here
class CSVReplace(Resource):
    def get(self):
        return {'hello': 'world'}

    def post(self):
        return {'bye': 'world'}


class TXTReplace(Resource):
    def get(self):
        return {'hello': 'world'}

    def post(self):
        return {'bye': 'world'}


api.add_resource(CSVReplace, '/anon/csv-replace')
api.add_resource(TXTReplace, '/anon/text-replace')

if __name__ == '__main__':
    app.run(debug=True)
