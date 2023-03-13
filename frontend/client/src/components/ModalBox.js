import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from "react-bootstrap/Modal";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import parse from 'html-react-parser';

export default function ModalBox({title, info, color, code, content}) {
    const [showModal, setShow] = useState(false);

    const toggleModal= () => setShow(!showModal);
    
  return (
    <div>
        <ModalStyled onClick={toggleModal} color={color}>
            <h3>{title}</h3>
            <p>{info}</p>
        </ModalStyled>
  
        <Modal show={showModal} onHide={toggleModal} size="lg" centered>
            <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {parse(content)}
                <SyntaxHighlighter language="javascript" style={atomDark} codeTagProps={{style: {fontFamily: 'monospace'} }}>
                    {code.trim()}
                </SyntaxHighlighter>
            </Modal.Body>
        </Modal>

    </div>
  )
}

const ModalStyled = styled.div`
    cursor: pointer;
    width: 18rem;
    height: 18rem;
    border-radius: 6px;
    background-color: ${props => props.color};
    display: inline-block;

    h3 {
        color: white;
        text-decoration: underline;
        font-size: 28px;
        font-weight: 500;
        margin: 1rem;
        margin-top: 2rem;
    }

    p {
        padding-top: 0.5rem;
        color: #DBD4D4;
        font-size: 26px;
        font-weight: 500;
        margin: 1rem;
    }

    
    
`