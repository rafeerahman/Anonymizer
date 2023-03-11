from flask_restful import reqparse, Resource
from flask_restful_swagger import swagger
from common.util import textReplace
import re

parser = reqparse.RequestParser()

class CSVReplace(Resource):
    
  def post(self):
    return None