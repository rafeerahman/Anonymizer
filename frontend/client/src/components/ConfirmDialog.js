import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmDialog({title, showConfirmDialog, toggleConfirmDialog, onConfirm}) {
  return (
    <Modal show={showConfirmDialog} onHide={toggleConfirmDialog}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>

        {/* <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body> */}

        <Modal.Footer>
          <Button onClick={onConfirm} variant="danger">Yes</Button>
          <Button onClick={toggleConfirmDialog} variant="secondary">No</Button>
        </Modal.Footer>
    </Modal>
)
}