# syntax=docker/dockerfile:1
FROM python:3

RUN mkdir -p /var/www && chown -R root:root /var/www

COPY $BACKEND_DIR /var/www/

WORKDIR /var/www

# RUN python3 -m venv env && source env/bin/activate
RUN pip install -r requirements.txt

EXPOSE 5000

WORKDIR /var/www/anonymizer

# RUN ["python3", "-m", "flask", "run", "--host=0.0.0.0"]
CMD ["python3", "-m", "flask", "run", "--host=0.0.0.0"]