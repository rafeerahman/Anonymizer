import React, { useEffect } from 'react'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (message) => toast(message);

export default function UploadFileButton({fileName, setFileName, setFile, currentEndpoint}) {
  return (
    <BtnStyled>
      <label className="custom-file-upload">
        <input type="file" id="file-upload" name="upload file" accept={currentEndpoint.fileType} disabled={currentEndpoint.URL.length === 0}
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
    </BtnStyled>
  )
}

const BtnStyled = styled.div`
  display: inline;
  
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
        margin-top: 1rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

`
