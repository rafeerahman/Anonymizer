from flask_restful import reqparse, Resource
from flask import Response
from common.util import textReplace
from werkzeug.datastructures import FileStorage
import pandas as pd 
import re

parser = reqparse.RequestParser()
parser.add_argument('inputFile', type=FileStorage, location='files')
parser.add_argument('replaceTerms', location='form')

class CSVReplace(Resource):
    
  def post(self):
    args = parser.parse_args()

    inputFile = args['inputFile']
    replaceTerms = eval(args['replaceTerms'])

    data = pd.read_csv(inputFile)
    df_updated = data.apply(lambda m: m.replace(replaceTerms, regex=True))

    return Response(
      df_updated.to_csv(index=False),
      mimetype="text/csv",
      headers={"Content-disposition": "attachment; filename=filename.csv"})