import React, { useState } from 'react'
import styled from 'styled-components'
import ModalBox from '../components/ModalBox'
import MainNavbar from '../components/Navbars/MainNavbar'

export default function ExamplesPage() {
  
  const textAPI = `
  fetch('https://csc301-378115-backend-4ic67og2pa-pd.a.run.app/api/anonymize/text', {
      method: 'post',  
      body: {
          "inputText": "My name is Jack, and you can reach me at 647-123-321",
          "replaceTerms": {"Jack": "NAME", "647-123-321": "XXX-XXX-XXX"}
      },
      headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
      }
  })
  `;

  const textAPIContent = `
    <b>Expected Input</b>
    <p>Any variation of text, including multi-line text.</p>
    <h5><b>Example</b></h5>
    <b>Inputted Text</b>
    <p>"My name is Jack, and you can reach me at 647-123-321"</p>
    <b>Replacement Parameters</b>
    <p>Replace "Jack" with "NAME", and replace "647-123-321" with "XXX-XXX-XXX"</p>
    <b>Expected Response</b>
    <p>"My name is NAME, and you can reach me at XXX-XXX-XXX"</p>
    <b>API Request Example</b>
  `

  const csvAPI = `
  fetch('https://csc301-378115-backend-4ic67og2pa-pd.a.run.app/api/anonymize/file/csv', {
      method: 'post',  
      body: {
          "inputFile": file.csv,
          "replaceTerms": {"John": "NAME", "Toronto": "CITY"}
      },
      headers: {
          Accept: "*/*"
      }
  })
  `;

  const csvAPIContent = `
    <b>Expected Input</b>
    <p>A comma seperated value (CSV) file.</p>
    <h5><b>Example</b></h5>
    <b>Inputted CSV file</b>
    <p>Name, City, Occupation</p>
    <p>John, Toronto, Student</p>
    <p>Jack, Toronto, Developer</p>
    <b>Replacement parameters</b>
    <p>Replace "John" with "NAME", and replace "Toronto" with "CITY"</p>
    <b>Expected response</b>
    <p>Name, City, Occupation</p>
    <p>NAME, CITY, Student</p>
    <p>Jack, CITY, Developer</p>
    <b>API Request Example</b>
  `

  return (
    <ExamplesStyled>
      <MainNavbar />
      <h2>Examples</h2>
      <div className="modals">
        <ModalBox title={"text anonymization"} info={"see how to anonymize plain text or text files"} color={"#5436DA"} code={textAPI} content={textAPIContent}/>
        <ModalBox title={"csv anonymization"} info={"see how to anonymize csv files such as spreadsheet data"} color={"#0f803c"} code={csvAPI} content={csvAPIContent}/>
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