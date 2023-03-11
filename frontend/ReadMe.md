# Group 17 Assignment 2: Frontend Sub-Team

## Desicions Summary

The user story we defined for our frontend is as follows:

As a university administrator with limited technical experience,
I want to find a simple and intuitive way to anonymize the names from a university essay application or spreadsheet with applicant names,
so that the data can be sent to admission staff for review, without any possible name bias.

<br />

> Acceptance Criteria: 
> <br> Given that the admin wishes to anonymize their text and has no prior API experience 
> <br><br> When they:
> * Select the type of anonymization they want to do (either CSV or text-replace) and
> * Input their text using either a textbox or by uploading a text or csv file and
> * Enter the value and the name that they want to be replaced and
> * Click a submit button
> 
> Then:
> 
> On a 200 response code from the backend server, a success message is displayed on the webpage, with a button allowing them to download their anonymized file. 

<br />

Given this user story, our team focused on creating the user interface for it. Currently, it is not connected with the backend, so we did not focus on the "Then" portion of the user story. 

We began by creating a design for how our frontend would look. We decided that our routes would consist of a home page that explains what our API is, an examples page that would show examples of how to use our API, a docs page that gives users API documentation, and a playground page that would allow the user to try out our API with a graphic user interface.

For assignment 2, the playground page is what we focused on and that is what contains our user story definition. In this playground, the user is able to select one of our endpoints through a drop-down menu created in React and bootstrap. Below the drop down menu is a text area, where the user can copy and paste the text they wanted to anonymize. On the right of these elements is a component where the users can enter the parameters that will be sent in the request. These parameters currently support our key-value replacement algorithm, which takes the given name and replacement value, and replaces the name with the value in the given text. 

We also included an upload file button, and a submit button. Additionally, we implemented an error message component, created using Toast. Currently, this component only shows a message to the user if a file upload fails or if the uploaded file is not a ".csv" or ".txt" file type, but in the future we plan to reuse this component to display other errors or bad requests to the user. Users are only allowed to upload a file once an endpoint from the dropdown is selected. When they successfully upload the file, the name of their file is shown on the button. Our submit button is supposed to handle the "Then" section of our user story, however as the frontend is not connected to the backend yet, we did not implement any logic for this yet.

In addition to all these components, we also set up the React states which hold all the data we need so that we will be able to easily send this data in the future once we connect our backend.

## Individual Contributions

### Edward Leung
I was responsible for the creation of the Navbar for UofT-Anonymization and the error message toast alerts that would notify the user of an unsucessful file upload, a 400 error, or another mistake, as per the user story. To test the alerts, I added error checking logic to the file upload button, for example checking if the upload was a csv file. I also helped create the Figma design that would become the blueprint for our web application's aesthetic, contributing to the navbar and the aesthetic for key-value parameters on the playground page, which I based off LinkedIn skills. 

### Mehrdad Ghannad
I was responsible for creating the dropdown and parameter selector components on the playground page. The dropdown component allows the user to select the endpoint to send the request to, and the parameters component is used to set the parameters to send with the API request. I mainly used Bootstrap to replicate our team's design in Figma for all components. I also played a minor part in enforcing the upload of only appropriate file types for each endpoint.

### Rafee Rahman
I was responsible for creating the routes for each page, and working on the playground page. For the playground page, I added the textarea, the upload file button, and the submit button. Some specific things I worked on were customizing the upload file button, and setting up the states for the data in both the text area and upload file button. The other main thing I worked on was styling the playground page. I styled the page by following our figma design and using CSS with react styled-components. I also wrote the decisions summary for this read-me. 

## Instructions / Documentation

1. Go to https://csc301-378115-frontend-4ic67og2pa-pd.a.run.app
2. Here you can see the nav bar, home page, and can click on each item in the navbar to reroute yourself.
3. In the playground page, you can verify the frontend user story we described (Note: as the backend is the connected to the frontend, this is purely the frontend).
    * Select the drop down to see a list of our end points / anonymization methods
    * Enter a name in the parameters "Name" input field.
    * Enter a value in the parameters "Value" input field.
    * Click the "Add" button.
    * Enter text in the text area.
    * Click the upload file button, if you upload a wrong file type, a notification will pop-up disallowing that file. This upload button only allows for .csv and .txt files.
