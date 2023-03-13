import React from 'react'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const notify = (message) => toast(message);

export default function UploadFileButton({fileName, setFileName, file, setFile, setText, currentEndpoint, setResponseText}) {
  return (
    <BtnStyled>
      <label className="custom-file-upload">
        <input
          key={file ? file.name : "file-upload"}
          type="file"
          id="file-upload"
          name="upload file"
          accept={currentEndpoint.fileType}
          disabled={currentEndpoint.URL.length === 0}
          onChange={e => {
            console.log(e.target.files[0].type)
            if (e.target.files[0].type !== currentEndpoint.fileType) {
              notify(`Please upload a valid ${currentEndpoint.fileType} file`)
            }
            else {
              setFile(e.target.files[0])
              setFileName(e.target.files[0].name)
            }
          }}
        />
        {fileName}
      </label>
      {file && 
        <span
          className="clear-file"
          onClick={() => {
            setFile(undefined)
            setFileName(`upload ${currentEndpoint.fileType} file`)
            setText("")
            setResponseText("")
          }}
        >
        <FontAwesomeIcon
            icon={faTimes}
            className="text-black"
        />
        </span>
      }

    </BtnStyled>
  )
}

const BtnStyled = styled.div`
    display: inline;
    position: relative;
    margin-top: 1rem;
  
    input[type="file"] {
        display: none;
    }

    .custom-file-upload {
        width: 315px;
        height: 50px;
        background-color: black;
        color: white;
        border-radius: 10px;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .clear-file {
      position: absolute;
      top: 0;
      right: 0;
      width: 30px;
      height: 100%;
      background-color: red;
      color: white;
      border: none;
      border-radius: 0 10px 10px 0;
      cursor: pointer;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

`
