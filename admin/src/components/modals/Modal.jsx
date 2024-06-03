import React from "react";
import { Modal, Button } from "rsuite";

const ModalView = ({ open, setOpen, body, size, title }) => {
  return (
    <Modal
      backdrop="static"
      open={open}
      onClose={() => setOpen(false)}
      size={size}
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ width: "100%" }}>{body}</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setOpen(false)} appearance="primary">
          Ok
        </Button>
        <Button onClick={() => setOpen(false)} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalView;
