import parse from 'html-react-parser';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';

export default function ModalBox({title, info, color, code, content}) {
    const [showModal, setShow] = useState(false);
    const [textExample, setExample] = useState(false)

    const toggleModal= () => {setExample(false); setShow(!showModal);};
    const switchExample = () => setExample(!textExample);

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
                <Form.Check 
                    type = "switch"
                    id = "toggle-button"
                    label = {textExample ? "" : "View auto-replace example"}
                    onChange={switchExample}
                />
                <SyntaxHighlighter language="javascript" style={atomDark} codeTagProps={{style: {fontFamily: 'monospace'} }}>
                    {textExample ?  code?.autoCode?.trim() : code?.nonAutoCode?.trim()}
                </SyntaxHighlighter>
                {textExample ? parse(content?.autoContent) : parse(content?.nonAutoContent)}
            </Modal.Body>
        </Modal>

    </div>
  )
}

const ModalStyled = styled.div`
    cursor: pointer;
    width: 20rem;
    height: 20rem;
    border-radius: 0.5rem;
    background-color: ${props => props.color};
    display: inline-block;
    position: relative;
    margin-bottom: 2rem;

    :before {
        content: "";
        position: absolute;
        height: 0;
        width: 100%;
        background : #fff;
        left: 0;
        bottom: 0;
        transition: all .3s;
        opacity: 0.3;
    }

    :hover:before {
        height: 100%;
    }

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