#!/bin/bash

pip install pipenv
python3 -m virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
cd anonymizer/
python3 app.py