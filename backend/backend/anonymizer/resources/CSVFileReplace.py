from flask_restful import reqparse, Resource
from flask_restful_swagger import swagger
from flask import Response
from common.util import textReplace
from werkzeug.datastructures import FileStorage
import pandas as pd
from pandas._libs import lib
from pandas.core.dtypes.missing import isna
import pandas.io.common
import numpy as np

parser = reqparse.RequestParser()
parser.add_argument('inputFile', type=FileStorage, location='files')
parser.add_argument('replaceTerms', location='form')

def advanced_replace(array, replaceTerms):
  
  f = lambda x: textReplace(x, replaceTerms)
  
  arr = np.asarray(array, dtype=object)
  mask = isna(arr)
  map_convert = not np.all(mask)
  
  result = lib.map_infer_mask(arr, f, mask.view(np.uint8), map_convert)

  return result

class CSVFileReplace(Resource):
  "Simple text replace anonymization tool"
  @swagger.operation(
      responseClass='text/csv',
      parameters=[
          {
            "name": "inputFile",
            "description": "CSV file that the user wises to anonymize",
            "required": True,
            "allowMultiple": False,
            "dataType": 'text/csv'
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
            "message": "[ANONYMIZED USER CSV FILE]"
          },
          {
            "code": 400,
            "message": "missing parameter(s)"
          }
        ]
      )
  def post(self):
    
    # Collect the input parameters
    args = parser.parse_args()
    inputFile = args['inputFile']
    replaceTerms = eval(args['replaceTerms'])
    
    # Read from the csv and input into a dataset
    try:
      data = pd.read_csv(inputFile, dtype=str, header=None)
    except pandas.errors.EmptyDataError:
      return {'message': 'invalid csv formatting'}, 400
    
    # Update row by row
    df_updated = data.apply(lambda m: pd.Series(advanced_replace(m._data.array, replaceTerms)))
    
    return Response(
      df_updated.to_csv(index=False, header=False),
      mimetype="text/csv",
      headers={"Content-disposition": "attachment; filename=filename.csv"})