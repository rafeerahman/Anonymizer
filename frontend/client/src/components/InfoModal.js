import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';

export default function InfoModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <BtnStyled>
        <button variant="primary" onClick={handleShow}>
          ? 
        </button>
      </BtnStyled>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>What is Auto Replace?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Here is some information about the huggingface API option.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const BtnStyled = styled.div`
    display: inline;
    position: relative;

    input {
        display: none;
    }

    button {
        width: 34px;
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
    }
`