from flask import Flask, render_template
from flask_restful import Api
from resources.TXTReplace import TXTReplace
from resources.TXTFileReplace import TXTFileReplace
from flask_restful_swagger import swagger

app = Flask(__name__)
api = swagger.docs(Api(app), apiVersion='0.0.1')

@app.route('/')
def render_directory():
    return render_template('index.html')

api.add_resource(TXTReplace, '/anon/text-replace')
api.add_resource(TXTFileReplace, '/anon/text-file-replace')
# adding more endpoints here

if __name__ == '__main__':
    app.run(debug=True)
