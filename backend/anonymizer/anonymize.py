import functools

# will possibly need some of these imported modules from flask?
# TODO: delete the ones not needed
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

# this is the blueprint for anonymization module
bp = Blueprint('anonymize', __name__, url_prefix='/anonymize')


@bp.route('/csv-replace', methods=['POST', 'GET'])
def csv_replace():
    if request.method == 'POST':
        # TODO: code for csv-replace should go here
        return 'Hello, I am CSV!'
    else:
        # TODO: how to handle other forms of requests
        return 'Hello, I am GET CSV!'


@bp.route('/text-replace', methods=['POST', 'GET'])
def text_replace():
    if request.method == 'POST':
        # TODO: code for csv-replace should go here
        return 'Hello, I am text!'
    else:
        # TODO: how to handle other forms of requests
        return 'Hello, I am GET text!'
