# Group 17.2: Backend Written Analysis

## 1. Decision Outline

#### Introduction
The goal for our sub-team was to design and build the first endpoint in our anonymization API. This endpoint was our standard "text anonymization" endpoint and serves as the MVP of the backend portion of our assignment. Since the project was started from scratch, it was very important for us to put lots of consideration into the design and implementation of this endpoint. Outlined below are the various major sections that we split this assignment into, and the major design decisions that needed to be made in each section.

#### Flask
We decided that it would be best to build our API using the Flask web application framework. This was a design decision that was made within our larger group, and something that our partner was in agreement with. Our criteria for this decision were to find something that was scalable, lightweight, and familiar to our team. Flask's simplicity and customizability met all of our team's requirements. Additionally, since it is an open-source Python web framework, we all had some preexisting familiarity. Our only other consideration was Django, but we felt that the overhead associated with it was beyond the scope of our team's project. We had no need for Django built-in user models or database support since our API's goal is to ensure the anonymity of the client. Thus far into the project, Flask has served as well and remains a strong design decision.
    
#### RESTful API
For the backend implementation, we decided to build a RESTful API. We found that our project would benefit the most from the lightweight design and flexibility that come with REST APIs. This is because our group plans on later connecting the front end to this API, but also allowing it to stand alone. Therefore, we wanted to pick something that would value client-server separation, so that both systems can grow independently. Additionally, since our project is centred around privacy, it was important to our group to maintain those values throughout our infrastructure. The stateless criteria of a RESTful API helped with this so that no calls were dependent on one another, and no information was preserved between calls. This combined with the Flask framework allowed us to create Resources for each endpoint.

#### File Structure
We divided each Resource into separate Python files, which gave us a more modular file structure. This allows us the flexibility to be able to add new endpoints and resources in the future. Additionally, it enables us to have an easier time with testing and debugging.

#### Algorithm
It was very important to use we design a simple and efficient algorithm for anonymizing text. We had gone through various iterations of the algorithm until it was perfected and running without error. Our original implementation took advantage of Python's built-in replacement features,
but this proved to be very inefficient and ineffective. After further research and experimentation, we found that it would be best to utilize regular expressions to power our algorithm. To summarize our algorithm, we would take our desired keys and terms, take all of our keys and turn them into one large regex statement. Using this regex, we are able to parse over our blocks of text, in search of what we wish to replace. When found, we are able to conduct the necessary swap, without any error. This implementation was found to be so effective because it utilizes regex statements for their original purpose, and Python has a great set of features for utilizing them. Furthermore, it was designed in a way that will allow future endpoints to continue to build off of it and bring different anonymization features.

#### Documentation & Ease of Access
Our last design decision was to incorporate documentation and instruction throughout our API. We believe that all good APIs need to be properly organized and documented. Therefore, we integrated our API with Swagger and filled in all the necessary details for use. Additionally, we created a simple HTML directory on the root page of our web application. This page can redirect the user to specific endpoints and their associated documents.

## 2. Individual Contributions
   
#### Sayna Sohrabzadeh (sohrabza): 
 - Worked on file structure, laid out the Restful API structure and created separate files for each resource for the of modularized testing
 - Created Postman collection
 - Set up wsgi server configuration for the project to be hosted on

#### Jonathan Ginevro (ginevroj):
- Design/implementaion for the anonymization algorithm
- Integrated Swagger and added endpoint documentation
- Created HTML endpoint directory

## 3. Setup Instructions

#### Deployed Application
Our application is currently deployed and can be accessed: at https://csc301-378115-backend-4ic67og2pa-pd.a.run.app/ (large thanks to our devops team)

#### Local Startup Steps
Firstly, to setup the virtual environment, install pipenv and make the following initializations:
```bash
pip install pipenv
python3 -m virtualenv venv
source venv/bin/activate
```
There are other installations that need to be made in the virtual environment. These can all be found in `backend/requirements.txt`:
```bash
pip install -r backend/requirements.txt
cd backend/anonymizer/
```

#### Local Running Steps: Development Server
We have setup both a development and production server. To run the development server, execute the following command:
```bash
python3 -m flask run
```

#### Local Running Steps: Production Server
To setup the production server, we need to ensure that the port number is set to 5000 for wsgi:
```bash
sudo ufw allow 5000
```
Then to run the application, we must execute the following:
```bash
uwsgi --socket 127.0.0.1:5000 --protocol=http -w wsgi:app
```
Both the production and the development servers should then be made locally available at `127.0.0.1:5000`

#### Startup Script
This entire setup process is included in the `start.sh` script. Execute the following to run the development server:
```bash
source ./start_dev.sh
```
Execute the following to run the production server:
```bash
source ./start_prod.sh
```

#### Testing Endpoints
The file `CSC301-project-backend-tests.postman_collection` includes the Postman collection. The collection tests for every edge cases for the endpoint working on a string of a .txt file. The file can be opened via the Postman application and the body of the post requests have been prefilled to test.
