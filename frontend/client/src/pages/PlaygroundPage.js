import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import DropdownMenu from '../components/Dropdown.js'
import MainNavbar from '../components/Navbars/MainNavbar.js'
import Parameters from '../components/Parameters.js'
import SubmitButton from '../components/SubmitButton.js'
import TextArea from '../components/TextArea.js'
import UploadFileButton from '../components/UploadFileButton.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendTextToAnonymize } from '../actions/sendTextToAnonymize.js'
import { sendCsvToAnonymize } from '../actions/sendCsvToAnonymize.js'

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
  const [text, setText] = useState("")
  const [fileName, setFileName] = useState("upload file")
  const [file, setFile] = useState(undefined)
  const [currentEndpoint, setCurrentEndpoint] = useState({
    displayName: "Select Endpoint",
    URL: "",
    fileType: ""
  })
  const [responseText, setResponseText] = useState("")

  const readFile = () => {
    let reader = new FileReader()
    reader.onload = function(e) {
        let content = reader.result
        setText(content)
        console.log('Successfully read file')
    }
    reader.readAsText(file)
  }

  const handleInputErrors = () => {
    const flag = false;

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
      // sendCsvToAnonymize('not done');
    }
  }

  const resetParams = () => {
    setText("")
    setFileName("upload file")
    if (file) {
      setFile(undefined)
    }
    setReplaceTerms({})
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
    setFileName(`upload ${currentEndpoint.fileType} file`)
  }, [currentEndpoint])

  useEffect(() => {
    if (file) {
      readFile() // sets textarea to contents of file. 
    }
  }, [file])

  return (
    <>
      <MainNavbar />
      <ContentStyled>
        <ToastContainer />
          <LeftContentStyled>
            <DropdownStyled>
              <DropdownMenu className="dropDown"
                endpoints={endpoints}
                currentEndpoint={currentEndpoint}
                setCurrentEndpoint={setCurrentEndpoint}
                resetParams={resetParams}
              />
            </DropdownStyled>

            <TextArea
              text = {text}
              setText = {setText}
            />
            <ButtonsContainer>
              {/* if Else statement, if endpoint.filetype == "", do not display button */}
                {currentEndpoint.fileType !== "" && 
                  <UploadFileButton 
                  fileName={fileName}
                  setFile={setFile}
                  setFileName={setFileName}
                  currentEndpoint={currentEndpoint}
                />
              }
              {/* if responseText == "", do not display download output button */
                responseText === "" && 
                <BtnStyled>
                  <button onClick={() => handleDownload()}>download output</button>
                </BtnStyled>
              }
              { /* if no endpoint is selected, do not display submit button */
                currentEndpoint.fileType !== "" &&  
                <SubmitButton onClick={handleSubmit}/>
              }
            </ButtonsContainer>
          </LeftContentStyled>

          <RightContentStyled>
            <Parameters
              replaceTerms={replaceTerms}
              setReplaceTerms={setReplaceTerms}
            />
          </RightContentStyled>
      </ContentStyled>
    </>
  )
}

const ContentStyled = styled.div`
  display: flex;
  margin: 2rem;
  
`
const RightContentStyled = styled.div`
  width: 30%;
  margin-left: 2rem;
`
const LeftContentStyled = styled.div`
  width: 70%;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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