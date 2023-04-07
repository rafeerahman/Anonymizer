import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

export default function ExampleOrResetButton({
    text, setText, file, setFile, resetParams, useAuto, setReplaceDict, setSwitchDict, autoReplaceTerms,
    setAutoReplaceTerms, replaceTerms, setReplaceTerms, setCurrentFileType,
    setResponseText
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
                if (checked || text.length || file ||
                  Object.keys(replaceTerms).length || Object.keys(autoReplaceTerms).length) { //clear all fields
                  setText("")
                  setFile(undefined)
                  setReplaceTerms({});
                  setAutoReplaceTerms({});
                  setResponseText("")
                  setChecked(false)
                }
                else { // load example data
                  // erase the currently existing file and parameters 
                  resetParams();
                  setReplaceTerms({}); 
                  setAutoReplaceTerms({});
                  if (useAuto){
                    setText(`Here is my personal information:\n \
                    \nName: John Smith\nAddress: 1234 Main Street, Toronto, Ontario, M64 3H6\nPhone Number: 555-123-4567\nCredit Card Number: 4637 2737 2791 0533\nCurrent Highschool: Cedar Valley Institute\n \
                    \nSincerely, \nJohn Smith`);
                    setSwitchDict({"names": true, "location": true, "org": true, "phone_number": true, "postal_code": true, "credit_card": true});
                    setReplaceDict( {
                      "names":  "name",
                      "location": "location",
                      "org": "organization",
                      "phone_number": "phone-number",
                      "postal_code": "postal-code",
                      "credit_card": "credit-card"
                      }
                    );
                    setCurrentFileType({
                      displayName: "Text Replace",
                      URL: "endpoint-url-for/text-replace",
                      fileType: "text/plain"
                    });
                    setChecked(true);
                  }
                  else{
                    // populate based on example
                    setText("My name is Jack, and you can reach me at 647-123-4321");
                    setReplaceTerms({"Jack": "NAME", "647-123-4321": "XXX-XXX-XXXX"});
                    setCurrentFileType({
                      displayName: "Text Replace",
                      URL: "endpoint-url-for/text-replace",
                      fileType: "text/plain"
                    });
                    setChecked(true)
                }
                }
              }}
            />
            {checked ||text.length || file || 
              Object.keys(replaceTerms).length || Object.keys(autoReplaceTerms).length
              ? "Clear": useAuto? "Load Auto Text Example" : "Load Text Example"}
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
