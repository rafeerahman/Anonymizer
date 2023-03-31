# Student Anonymization API

The Student Anonymization API is a free and open-source service that allows users to desensitize private information from a file or body of text. Our service is accessible via request methods or a graphical user interface. The application is designed to provide educators with easy access to an array of online privatization tools. As a group, we are passionate about improving user privacy and making a difference to protect people’s sensitive information. We have instilled this passion into our project, to work towards a product that is valuable, accessible and intuitive for our userbase.

## Frontend Deployment: https://csc301-378115-frontend-4ic67og2pa-pd.a.run.app/

#### D3 Slide deck: https://docs.google.com/presentation/d/1O6qeUsJYhrxbfmrDBzi-MZa-s2MzHhEXmBmYKN1xgJw/edit?usp=sharing

### Description & Instructions:

Our frontend consists of four pages, the home page, a docs page, an examples page, and a playground page. The home page provides a description of our application, and the docs page provides our backend API documentation. Our examples page consists of two sections that describe the use-cases and expected results of how our text-anonymization and csv-anonymization endpoint features currently work. All pages of the frontend are also mobile responsive. 

The playground page is the main frontend feature we worked on that allows a user to anonymize text, or a csv file using our user interface. The user can select which endpoint they want to access using by clicking a drop-down menu that toggles either ‘text replace’ or ‘csv replace’. The ‘text replace’ works by the user uploading a text file or inputting text into the text area provided, and inserting key-value input parameters of what they want to replace. The key represents the word in the text the user wants to replace, and the value represents what the key within the text is being replaced with. The ‘csv replace’ works in the same way, except the user must upload a CSV file. Currently, our API supports key-value replacement for both the CSV and text endpoints, however in the future we plan to expand this to a variety of anonymization techniques.

When the user is done inputting the parameters as defined, they can click submit, and upon a successful request, they are able to click ‘download output’ to download the anonymized file. 

## Backend Deployment: https://csc301-378115-backend-4ic67og2pa-pd.a.run.app/

### Description of backend testing:

To test the back end, access the folder of postman-testing in the backend folder. This folder includes the postman collection which can be opened in the application. To test the two new endpoints of TextFileReplace and CSVReplace, the mock files should be uploaded to the body. These files are placed in the csv-files and txt-files and the corresponding file can be uploaded for the tests. Note: there is a comment indicating which file should be uploaded in the postman collection parameter description.

## Key-Features
TextReplace: By sending a POST request to the specific endpoint, or accessing it via our frontend webpage, users can anonymize a set of key terms from a body of text. 

TextFileReplace: The text file endpoint is designed to extend the functionality of the TextReplace endpoint over a text file (rather than just a string). This endpoint also maps a set of replacement terms, while preserving the structure and formatting of a txt file.

CSVFileReplace: The CSV file endpoint is designed to again extend our original TextReplace endpoint, but now across an entire spreadsheet. This endpoint quickly searches across the cells of an entire dataset, so that any user can quickly and effectively anonymize sensitive information.

## Repo Organization
### Frontend / Backend
Our frontend and backend for this project are in the `frontend` and `backend` folders respectively.

### Devops
Our dockerfiles used to deploy our full web application are located in the `devops` folder. Our GitHub Actions workflows can be found in `.github/workflows`.

### Documents
Documents from prior assignments and deliverables are in the `documents` folder.

## Development Requirements

### Backend
Our backend uses Python version 3.10.

```
black
Flask
flask-restful
flask-restful-swagger
pytest
uwsgi
markupsafe==2.0.1
pandas
```

#### Local Startup Steps (Linux)
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

#### Local Startup Steps (Windows)
Firstly, to setup the virtual environment, install pipenv and make the following initializations:
```bash
pip install pipenv
python -m virtualenv venv
.\venv\Scripts\activate 
```
There are other installations that need to be made in the virtual environment. These can all be found in `backend/requirements.txt`. You must comment out the 'uwsgi' in the requirements.txt.
```bash
pip install -r backend/requirements.txt
cd backend/anonymizer/
```

#### Local Running Steps: Development Server
We have setup both a development and production server. To run the development server, execute the following command:
```bash
python3 -m flask run
```
For windows, type
```bash
python -m flask run
```

#### Startup Script (Linux)
This entire setup process is included in the `start.sh` script. Execute the following to run the development server:
```bash
source ./start_dev.sh
```
Execute the following to run the production server:
```bash
source ./start_prod.sh
```


### Frontend
Node version: v14.17.5

```
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^6.3.0",
    "@fortawesome/free-solid-svg-icons": "^6.3.0",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "bootstrap": "^5.2.3",
    "dotenv": "^16.0.3",
    "html-react-parser": "^3.0.12",
    "react": "^18.2.0",
    "react-bootstrap": "^2.7.2",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "react-scripts": "5.0.1",
    "react-syntax-highlighter": "^15.5.0",
    "react-toastify": "^9.1.1",
    "styled-components": "^5.3.6",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

#### Local Startup Steps (Windows/Linux)
To begin, you must download the dependencies as mentioned above by using the following commands in your terminal.

```bash
cd frontend/client
npm install
```

#### Local Running Steps

To view our client-side locally, type npm start in the frontend/client directory.

```bash
npm start
```

## Git/GitHub Workflow

Our git workflow consisted of creating issues on the GitHub Issues board for features and tasks that each of our sub-teams (frontend, backend, devops) had. We assigned these issues to members of the team, and kept track of their progress within the issues board. In addition, we also used git branches for the separate features, and reviewed/merged pull requests for each of these branches.

## License

Our project will be using the MIT License. We chose this license because we wish to be transparent with our software, and limit the restriction on it. The MIT License allows our project to be open source and permissively licensed. Additionally, the code will not be published until the project is done.
