from flask import Flask
from flask_restful import Api
from resources.CSVReplace import TXTReplace

app = Flask(__name__)
api = Api(app)


api.add_resource(TXTReplace, '/anon/text-replace')
# adding more endpoints here

if __name__ == '__main__':
    app.run(debug=True)
