from flask_restful import Resource


#TODO: Add logic here
class TXTReplace(Resource):
    def get(self):
        return {'hello': 'world'}

    def post(self):
        return {'bye': 'world'}
