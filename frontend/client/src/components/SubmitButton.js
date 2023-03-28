import React from 'react'
import { Spinner } from 'react-bootstrap'
import styled from 'styled-components'

export default function SubmitButton({loading, onClick}) {
  return (
    <BtnStyled>
        <button
          disabled={loading} onClick={onClick}>
            {loading ? <Spinner animation='border' size='sm'/> : 'Submit'}
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
        transition: background-color 0.3s;
    }


    button:hover {
      background-color: #127D63;
    }
`