import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ExampleButton({setReplaceTerms, setText, resetParams, setCurrentEndpoint}){
    const [checked, setChecked] = useState(false);

    return (
    <>
        <BtnStyled>
        <label className="custom-example">
        <input
          id="toggle-check"
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            setChecked(e.currentTarget.checked);
            if (!checked){ //load example was pressed
                // erase the currently existing file and parameters 
                resetParams();
                setReplaceTerms({}); 

                //populate based on example
                setText("My name is Jack, and you can reach me at 647-123-321");
                setReplaceTerms({"Jack": "NAME", "647-123-321": "XXX-XXX-XXX"});
                setCurrentEndpoint({
                    displayName: "Text Replace",
                    URL: "endpoint-url-for/text-replace",
                    fileType: "text/plain"
                  });
            }
            else{ //clear example was pressed
                resetParams();
                setReplaceTerms({});
                // setCurrentEndpoint({
                //     displayName: "Select Endpoint",
                //     URL: "",
                //     fileType: ""
                //   })
            }
        
        
        }}
          />
            {/* if checked is true, example is already loaded, otherwise example needs to be loaded */}
          {checked ? "Clear Text Example": "Load Text Example"}
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

    .custom-example {
        height: 50px;
        background-color: #5436DA;
        color: white;
        border-radius: 10px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
    }
`
