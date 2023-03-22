#!/bin/bash

pip install pipenv
python3 -m virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
sudo ufw allow 5000
cd anonymizer/
uwsgi --socket 127.0.0.1:5000 --protocol=http -w wsgi:app