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
          <Modal.Title>How to use auto replace?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Auto-replace will automatically detect and anonymize the categories that you specify.</p>
          <p>
          The current categories that are available include Names, Locations, Organizations, Phone Numbers, Postal Codes, and Credit Cards. 
          </p>
          <p><b> Instructions: </b></p>
          <p>
          To specify a category you want to detect, click the toggle button. 
          </p>
          <p>
          By default, anything that is detected will be deleted from the text. 
          </p>
          <p>
          In the case you want something that is detected to be replaced with specific text, you can enter that text in the input after you toggle the parameter.
          </p>
        </Modal.Body>
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
        border: none;
        background-color: #0F803C;
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

    button:hover {
      background-color: #09612c;
    }
`