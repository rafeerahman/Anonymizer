import React from 'react'
import styled from 'styled-components'

export default function SubmitButton({onClick}) {
  return (
    <BtnStyled>
        <button onClick={onClick}>
            submit
        </button>
    </BtnStyled>

  )
}

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