import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DropdownMenu from '../components/Dropdown.js'
import MainNavbar from '../components/Navbars/MainNavbar.js'
import Parameters from '../components/Parameters.js'
import AutoParameters from '../components/AutoParameters.js'
import SubmitButton from '../components/SubmitButton.js'
import TextArea from '../components/TextArea.js'
import UploadFileButton from '../components/UploadFileButton.js'
import ExampleButton from '../components/ExampleButton.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { sendTextToAnonymize } from '../actions/sendTextToAnonymize.js'
import { sendCsvToAnonymize } from '../actions/sendCsvToAnonymize.js'
import AutoButton from '../components/AutoButton.js'

const endpoints = [
  {
    displayName: "Text Replace",
    URL: "endpoint-url-for/text-replace",
    fileType: "text/plain"
  },
  {
    displayName: "CSV Replace",
    URL: "endpoint-url-for/csv-replace",
    fileType: "text/csv"
  }
]

const errors = {
  missingCsvFile: 'You must upload a CSV file',
  missingReplacementParams: 'You must input atleast one replacement parameter',
  missingText: 'You must input some text'
}

const notify = (message) => toast(message);

export default function PlaygroundPage() {
  const [replaceTerms, setReplaceTerms] = useState({})
  const [autoReplaceTerms, setAutoReplaceTerms] = useState({})
  const [text, setText] = useState("")
  const [fileName, setFileName] = useState("Upload file")
  const [file, setFile] = useState(undefined)
  const [currentEndpoint, setCurrentEndpoint] = useState({
    displayName: "Select Endpoint",
    URL: "",
    fileType: ""
  })
  const [responseText, setResponseText] = useState("")
  const [useAuto, setUseAuto] = useState(false)

  const readFile = () => {
    let reader = new FileReader()
    reader.onload = function(e) {
        let content = reader.result
        setText(content)
        console.log('Successfully read file')
    }
    reader.readAsText(file)
    setResponseText("") //to reset download button/output
  }

  const handleInputErrors = () => {
    let flag = false;

    if (currentEndpoint.fileType === 'text/plain') {
      if (text.length === 0) {
        notify(errors.missingText)
        flag = true
      }
    } else if (currentEndpoint.fileType === 'text/csv') {
      if (!file) {
        notify(errors.missingCsvFile)
        flag = true
      } 
    }

    if (Object.keys(replaceTerms).length === 0) {
      notify(errors.missingReplacementParams)
      flag = true
    }
    
    return flag
  }

  const handleSubmit = () => {
    let error = handleInputErrors()
    if (error) {
      return
    }

    if (currentEndpoint.fileType === "text/plain") {
      sendTextToAnonymize(text, file, replaceTerms, setResponseText, notify)
    } else if (currentEndpoint.fileType === "text/csv") {
      sendCsvToAnonymize(file, replaceTerms, setResponseText, notify);
    }
  }

  const resetParams = () => {
    setText("")
    setFileName("Upload file")
    if (file) {
      setFile(undefined)
    }
    // setReplaceTerms({})
    setResponseText("") //to reset download button/output 
  }

  const handleDownload = () => {
    const element = document.createElement("a");
    console.log(currentEndpoint.fileType)
    const file = new Blob([responseText], {type: currentEndpoint.fileType});
    element.href = URL.createObjectURL(file);
    if (currentEndpoint.fileType === "text/csv") {
      element.download = "output.csv";
    } else {
      element.download = "output.txt";
    }
    document.body.appendChild(element); // Needed for Firefox
    element.click();
  }

  useEffect(() => {
    if (!file) {
      setFileName(`Upload ${currentEndpoint.fileType} file`)
    }
  }, [currentEndpoint, file])

  useEffect(() => {
    if (file) {
      readFile() // sets textarea to contents of file. 
    }
  }, [file])

  return (
    <>
      <MainNavbar />
      <br />
       <Container fluid="md">
        <Row>
          <Col md={8}>
            <DropdownStyled>
              <DropdownMenu className="dropDown"
                endpoints={endpoints}
                currentEndpoint={currentEndpoint}
                setCurrentEndpoint={setCurrentEndpoint}
                resetParams={resetParams}
              />
            </DropdownStyled>
          </Col>
          <Col md={4}>
            <ExampleButton
              text={text}
              setText={setText}
              file={file}
              setFile={setFile}
              resetParams={resetParams}
              autoReplaceTerms={autoReplaceTerms}
              setAutoReplaceTerms={setAutoReplaceTerms}
              replaceTerms={replaceTerms}
              setReplaceTerms={setReplaceTerms}
              setCurrentEndpoint={setCurrentEndpoint}
              setResponseText={setResponseText}
            />
            <AutoButton useAuto={useAuto} setUseAuto={setUseAuto}/>
          <ToastContainer />
          </Col>
        </Row>
      <Row>
        <Col md={8}>
          <TextArea
            file = {file}
            text = {text}
            setText = {setText}
          />
        </Col>
        <Col md={4}>
          {/* if Else statement, if useAuto, display autoParameters, otherwise display Parameters */
            useAuto ?
            <AutoParameters
            autoReplaceTerms={autoReplaceTerms}
            setAutoReplaceTerms={setAutoReplaceTerms}
          /> : 
          <Parameters
          replaceTerms={replaceTerms}
          setReplaceTerms={setReplaceTerms}
        />
          }
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <ButtonsContainer>
              {/* if Else statement, if endpoint.filetype == "", do not display button */
                currentEndpoint.fileType !== "" && 
                <UploadFileButton className="uploadBtn" 
                  fileName={fileName}
                  file={file}
                  setFile={setFile}
                  setFileName={setFileName}
                  setText={setText}
                  currentEndpoint={currentEndpoint}
                  setResponseText={setResponseText}
                />
              }
              {/* if responseText == "", do not display download output button */
                responseText !== "" && 
                <BtnStyled>
                  <button onClick={() => handleDownload()}>download output</button>
                </BtnStyled>
              }
              { /* if no endpoint is selected, do not display submit button */
                currentEndpoint.fileType !== "" &&  
                <SubmitButton onClick={handleSubmit}/>
              }
            </ButtonsContainer>
        </Col>
      </Row>
      </Container>
    </>
  )
}

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
  
  @media (max-width: 990px) {
    justify-content: center;
  }
  
  @media (max-width: 767px) {
    margin-top: 1.5rem;
    align-items: center;
    display: block;
    width: 100%;
    
    div, button {
      width: 100%;
      margin: 0;
    }

    div button {
      width: 100%;
      margin-bottom: 1rem;
    }

    .custom-file-upload {
      display: flex;  
      align-items: center;
      text-align: center;
      width: 100%;
      margin-bottom: 1rem;
    }
    
    & > * {
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  }
`

const BtnStyled = styled.div`
    position: relative;
    button {
      height: 50px;
      width: 225px;
      background-color: #10A37F;
      border: none;
      border-radius: 10px;
      color: white;
      font-weight: 600;
      margin-top: 1rem;
    }
    button:hover {
      background-color: #127D63;
    }
`

const DropdownStyled = styled.div`
  button {
    width: 100%;
    margin-bottom: 1rem;
    border-radius: 10px;
    text-align: left;
    border: 1px solid #DBD4D4;
    padding: 1rem;
    font-size: 24px;
    font-weight: 600;   
  }  
`