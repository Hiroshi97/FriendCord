import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

export default function AddFriendWrapper({show, handleClose}) {

  return (
    <div>
      <Modal show={show} onHide={()=>{ handleClose() }}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose()}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleClose()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

AddFriendWrapper.propTypes = {
  show: PropTypes.bool,
  handleAFWClose: PropTypes.func
};
