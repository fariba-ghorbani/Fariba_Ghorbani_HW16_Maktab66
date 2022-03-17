import Modal from 'react-bootstrap/Modal'
import React, { useEffect, useState } from "react";


function ModalMessage(props) {
  return (
      <Modal className='modal'
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>کاربر گرامی</h4>
          <p>
            {props.message}
          </p>
        </Modal.Body>
      </Modal>
    );
}
  
export default ModalMessage;