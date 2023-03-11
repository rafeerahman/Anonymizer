from flask_restful import reqparse, Resource
from flask import Response
from common.util import textReplace
from werkzeug.datastructures import FileStorage
import pandas as pd
from pandas._libs import lib
from pandas.core.dtypes.missing import isna
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


class CSVReplace(Resource):

  def post(self):
    args = parser.parse_args()
    
    inputFile = args['inputFile']
    replaceTerms = eval(args['replaceTerms'])
    
    data = pd.read_csv(inputFile)
    df_updated = data.apply(lambda m: pd.Series(advanced_replace(m._data.array, replaceTerms)))
    
    return Response(
      df_updated.to_csv(index=False),
      mimetype="text/csv",
      headers={"Content-disposition": "attachment; filename=filename.csv"})