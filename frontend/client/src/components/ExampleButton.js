import React, { useState } from 'react'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css';

export default function ExampleButton({
    text, setText, file, setFile, resetParams, autoReplaceTerms, setAutoReplaceTerms, replaceTerms, setReplaceTerms, setCurrentEndpoint, setResponseText
}){
    const [checked, setChecked] = useState(false);

    return (
      <>
        <BtnStyled>
          <label className="custom-example">
            <input
              id="toggle-check"
              type="checkbox"
              checked={checked}
              onChange={() => {
                // if any fields are filled, clear all fields
                if (checked || text.length || file || Object.keys(replaceTerms).length || Object.keys(autoReplaceTerms).length) { //clear all fields
                  setText("")
                  if (file) {
                    setFile(undefined)
                  }
                  setReplaceTerms({});
                  setAutoReplaceTerms({});
                  setResponseText("")
                  setChecked(false)
                }
                else { // load example data
                  // erase the currently existing file and parameters 
                  resetParams();
                  setReplaceTerms({}); 

                  // populate based on example
                  setText("My name is Jack, and you can reach me at 647-123-4321");
                  setReplaceTerms({"Jack": "NAME", "647-123-4321": "XXX-XXX-XXXX"});
                  setCurrentEndpoint({
                    displayName: "Text Replace",
                    URL: "endpoint-url-for/text-replace",
                    fileType: "text/plain"
                  });
                  setChecked(true)
                }
              }}
            />
            {checked ||text.length || file || 
            Object.keys(replaceTerms).length || Object.keys(autoReplaceTerms).length
            ? "Clear": "Load Text Example"}
          </label>
        </BtnStyled>
      </>
    )
}

const BtnStyled = styled.div`
    display: inline;
    position: relative;

    input {
        display: none;
    }

    label {
        height: 34px;
        background-color: #5436DA;
        color: white;
        border-radius: 10px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-bottom: 1rem;
        transition: background-color 0.3s;
    }

    label:hover {
      background-color: #4a2db3;
    }
`
