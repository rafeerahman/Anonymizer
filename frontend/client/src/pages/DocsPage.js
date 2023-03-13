import React from 'react'
import MainNavbar from '../components/Navbars/MainNavbar'
import SwaggerDoc from '../components/Swagger'
import ENV from '../config.js'
import styled from 'styled-components'


const API_HOST = ENV.api_host 
const ENDPOINT_TEXT = ENV.endpoints.text_replace 
const ENDPOINT_TEXT_FILE = ENV.endpoints.text_file_replace
const ENDPOINT_CSV_FILE = ENV.endpoints.csv_file_replace

export default function DocsPage() {
  return (
    <>
      <MainNavbar />
      <DivStyled>
        <SwaggerDoc
          title="Text Replace"
          link={API_HOST + ENDPOINT_TEXT}
        />
        <SwaggerDoc
          title="Text File Replace"
          link={API_HOST + ENDPOINT_TEXT_FILE}
        />
        <SwaggerDoc
          title="CSV File Replace"
          link={API_HOST + ENDPOINT_CSV_FILE}
        />
      </DivStyled>
    </>
  )
}

const DivStyled = styled.div`
  margin-top: 2rem;
  margin-left: 10%;
  margin-right: 10%;
`