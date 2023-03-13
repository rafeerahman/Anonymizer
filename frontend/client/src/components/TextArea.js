import React from 'react'
import styled from 'styled-components';

export default function TextArea({file, text, setText}) {
  return (
    <TextAreaStyled>
        <textarea
          disabled={file}
          maxLength="500"
          placeholder='Enter text here'
          value={text}
          onChange={e => (setText(e.target.value))}>
        </textarea>
    </TextAreaStyled>
    
  )
}

const TextAreaStyled = styled.div`
    textarea {
        height: 65vh;
        width: 100%;
        background-color: #FFF6F6;
        border-radius: 10px;
        border: 1px solid black;
        padding: 1rem;
        font-weight: 300;
        font-size: 24px;
    }

    textarea[disabled] {
      background-color: #dddddd;
    }
`