import React from 'react'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const notify = (message) => toast(message);

export default function UploadFileButton({fileName, setFileName, file, setFile, setText, currentFileType, setResponseText}) {
  return (
    <BtnStyled>
      <label className="custom-file-upload">
        <input
          key={file ? file.name : "file-upload"}
          type="file"
          id="file-upload"
          name="upload file"
          accept={currentFileType.fileType}
          disabled={currentFileType.fileType.length === 0}
          onChange={e => {
            console.log(e.target.files[0].type)
            if (e.target.files[0].type !== currentFileType.fileType) {
              notify(`Please upload a valid ${currentFileType.fileType} file`)
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
            setFileName(`upload ${currentFileType.fileType} file`)
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
        background-color: #262626;
        color: white;
        border-radius: 10px;
        font-weight: 600;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .custom-file-upload:hover {
        background-color: black;
    }

    .clear-file {
      position: absolute;
      top: 0;
      right: 0;
      width: 30px;
      height: 100%;
      background-color: #D34643;
      color: white;
      border: none;
      border-radius: 0 10px 10px 0;
      cursor: pointer;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s;
    }

    .clear-file:hover {
      background-color: #B13C39;
    }

`
