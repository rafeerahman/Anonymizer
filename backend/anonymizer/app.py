from flask import Flask, render_template
from flask_restful import Api
from resources.TXTReplace import TXTReplace
from resources.CSVFileReplace import CSVFileReplace
from resources.TXTFileReplace import TXTFileReplace
from flask_restful_swagger import swagger
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})
api = swagger.docs(Api(app), apiVersion="0.0.3")


@app.route("/")
def render_directory():
    return render_template("index.html")


api.add_resource(TXTReplace, "api/anonymize/text")
api.add_resource(TXTFileReplace, "api/anonymize/file/txt")
api.add_resource(CSVFileReplace, "api/anonymize/file/csv")
# adding more endpoints here

if __name__ == "__main__":
    app.run(debug=True)
