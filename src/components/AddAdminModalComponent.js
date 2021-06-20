import {Button, Modal} from "reactstrap";
import React from "react";

function AddAdminModalComponent({show, toggle}) {
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={show}
      toggle={() => toggle()}
    >
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Добавить администратор
        </h5>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={() => toggle()}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">...</div>
      <div className="modal-footer">
        <Button
          color="secondary"
          data-dismiss="modal"
          type="button"
          onClick={() => toggle()}
        >
          Отмена
        </Button>
        <Button color="primary" type="button">
          Добавить
        </Button>
      </div>
    </Modal>
  );
}

export default AddAdminModalComponent;
