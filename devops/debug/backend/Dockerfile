# syntax=docker/dockerfile:1

FROM python:3

ARG BACKEND_DIR
ARG VER

RUN mkdir -p /var/www && chown -R root:root /var/www

COPY $BACKEND_DIR /var/www/

WORKDIR /var/www

# RUN python3 -m venv env && source env/bin/activate

EXPOSE 5000

RUN pip install pipenv

RUN python3 -m virtualenv venv

RUN . venv/bin/activate

RUN ls -la

RUN pip install -r ./backend/requirements.txt

WORKDIR /var/www/backend/anonymizer/

# uwsgi --socket 127.0.0.1:5000 --protocol=http -w wsgi:app
CMD ["uwsgi", "--socket", "0.0.0.0:5000", "--protocol=http", "-w", "wsgi:app"]