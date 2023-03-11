#!/bin/bash

pip install pipenv
python3 -m virtualenv venv
source venv/bin/activate
pip install -r backend/requirements.txt
cd backend/anonymizer/
python3 -m flask run