import React, { useState } from 'react'
import styled from 'styled-components'

export default function AutoButton({useAuto, setUseAuto}){
    return (
        <>
          <BtnStyled>
            <label className="custom-example">
            <input
              id="toggle-check"
              type="checkbox"
              checked={useAuto}
              onChange={() => {
                setUseAuto(!useAuto);
                
              }}
            />
            {useAuto ? "Disable Auto Replace": "Enable Auto replace"}
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
          height: 34px;
          background-color: #0F803C;
          color: white;
          border-radius: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          margin-bottom: 1rem;
      }
  `
  