import React, { useState } from 'react'
import styled from 'styled-components'
import ModalBox from '../components/ModalBox'
import MainNavbar from '../components/Navbars/MainNavbar'

export default function ExamplesPage() {
  
  // ------ Non-auto examples ------
  const csvAPI = `
fetch('https://csc301-378115-backend-4ic67og2pa-pd.a.run.app/api/anonymize/file/csv', {
    method: 'post',  
    body: {
        "inputFile": file.csv,
        "replaceTerms": {"John": "NAME", "Toronto": "CITY"},
        "autoReplace": false
    },
    headers: {
        Accept: "*/*"
    }
})
  `;

  const csvAPIContent = `
    <h4>Expected Input</h4>
    <p>A comma seperated value (CSV) file.</p>
    <h4>Example</h4>
    <b>Inputted CSV file:</b>
    <p>Name, City, Occupation
    <br>John, Toronto, Student
    <br>Jack, Toronto, Developer
    </p>
    <b>Replacement parameters:</b>
    <p>Replace "John" with "NAME", and replace "Toronto" with "CITY"</p>
    <b>Expected response:</b>
    <p>Name, City, Occupation
    <br>NAME, CITY, Student
    <br>Jack, CITY, Developer</p>
  `

  const textAPI = `
fetch('https://csc301-378115-backend-4ic67og2pa-pd.a.run.app/api/anonymize/text', {
  method: 'post',  
  body: {
      "inputText": "My name is Jack, and you can reach me at 647-123-321",
      "replaceTerms": {"Jack": "NAME", "647-123-321": "XXX-XXX-XXX"},
      "autoReplace": false
  },
  headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
  }
})
  `;

  const textAPIContent = `
    <h5>Expected Input</h5>
    <p>Any variation of text, including multi-line text.</p>
    <h5>Example</h5>
    <p><b>Inputted Text:</b> <br>"My name is Jack, and you can reach me at 647-123-321"</p>
    <p><b>Replacement Parameters:</b> <br>Replace "Jack" with "NAME", and replace "647-123-321" with "XXX-XXX-XXX"</p>
    <p><b>Expected Response:</b> <br>"My name is NAME, and you can reach me at XXX-XXX-XXX"</p>
  `

   // ------ Auto replace examples ------

  const csvAPIauto = `
fetch('https://csc301-378115-backend-4ic67og2pa-pd.a.run.app/api/anonymize/file/csv', {
    method: 'post',  
    body: {
        "inputFile": file.csv,
        "replaceTerms": {},
        "autoReplace": true,
        "autoReplaceTerms": {
            "names":"name",
            "location":"location",
            "org":"organization",
            "phone_number":"phone-number",
            "postal_code":"postal-code"
          }
    },
    headers: {
        Accept: "*/*"
    }
})
  `;

  const csvAPIContentAuto = `
    <h4>Expected Input</h4>
    <p>A comma seperated value (CSV) file.</p>
    <h4>Example</h4>
    <b>Inputted CSV file:</b>
    <p>Name, City, Occupation
    <br>John, Toronto, Student
    <br>Jack, Toronto, Developer
    </p>
    <b>Replacement terms:</b>
    <p>None</p>
    <b>Auto replace terms:</b>
    <p>Replace the detected categories with their respective replacement value. If the replacement value is left empty (i.e. " "), the detected categories will be deleted from the CSV. In this example
       <ul>
        <li>We are replacing detected names with the word "name"</li>
        <li>We are replacing detected locations with the word "location"</li>
        <li>We are replacing detected organizations with the word "organization"</li>
        <li>We are replacing detected phone numbers with the word "phone-number"</li>
        <li>We are replacing detected postal codes with the word "postal-code"</li>
       </ul>
    </p>
    <b>Expected response:</b>
    <p>Name, City, Occupation
    <br>name, location, Student
    <br>name, location, Developer
    </p>
  `

  const textAPIContentAuto = `
  <h5>Expected Input</h5>
  <p>Any variation of text, including multi-line text.</p>
  <h5>Example</h5>
  <p><b>Inputted Text:</b> <br>"My name is Jack, and I work at Google. My postal code is M6G 8N7 and you can reach me at 647-123-321."</p>
  <p><b>Replacement Parameters:</b> <br>None</p>
  <b>Auto replace terms:</b>
  <p>Replace the detected categories with their respective replacement value. If the replacement value is left empty (i.e. " "), the detected categories will be deleted from the CSV. In this example
     <ul>
      <li>We are replacing detected names with the word "name"</li>
      <li>We are replacing detected locations with the word "location"</li>
      <li>We are replacing detected organizations with the word "organization"</li>
      <li>We are replacing detected phone numbers with the word "phone-number"</li>
      <li>We are replacing detected postal codes with the word "postal-code"</li>
     </ul>
  </p>
  <p><b>Expected Response:</b> <br>"My name is name, and I work at organization. My postal code is postal-code and you can reach me at phone-number."</p>
  `
  const textAPIauto = `
fetch('https://csc301-378115-backend-4ic67og2pa-pd.a.run.app/api/anonymize/text', {
  method: 'post',  
  body: {
      "inputText": "My name is Jack, and I work at Google. My postal code is M6G 8N7 and you can reach me at 647-123-321.",
      "replaceTerms": {},
      "autoReplace": true,
      "autoReplaceTerms": {
          "names":"name",
          "location":"location",
          "org":"organization",
          "phone_number":"phone-number",
          "postal_code":"postal-code"
      }
  },
  headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
  }
})
  `

  return (
    <ExamplesStyled>
      <MainNavbar />
      <h2>Examples</h2>
      <div className="modals">
        <ModalBox title={"text anonymization"} info={"see how to anonymize plain text or text files"} color={"#5436DA"} 
          code={{autoCode: textAPIauto, nonAutoCode: textAPI}} 
          content={{autoContent: textAPIContentAuto, nonAutoContent: textAPIContent}}/>
        <ModalBox title={"csv anonymization"} info={"see how to anonymize csv files such as spreadsheet data"} color={"#0f803c"} 
          code={{autoCode: csvAPIauto, nonAutoCode: csvAPI }} 
          content={{autoContent: csvAPIContentAuto, nonAutoContent: csvAPIContent}}/>
      </div>
    </ExamplesStyled>
  )
}

const ExamplesStyled = styled.div`
  .modals {
    margin-top: 2rem;
    display: flex;
    gap: 5rem;
    justify-content: center;

  }

  h2 {
    text-align: center;
    font-weight: 600;
    margin-top: 4rem;
    font-size: 42px;
  }

  @media (max-width: 767px) {
    .modals {
      flex-direction: column;
      align-items: center;
      gap: 5rem;
      margin-bottom: 2rem;

    }
    
    
  }
`