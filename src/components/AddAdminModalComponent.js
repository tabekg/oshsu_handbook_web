import {Button, FormGroup, Input, Modal} from "reactstrap";
import React, {useState} from "react";
import firebase from "../utils/firebase";

const firestore = firebase.firestore();

function AddAdminModalComponent({show, toggle, onAdded}) {
  const [phone_number, setPhoneNumber] = useState('');
  const [full_name, setFullName] = useState('');
  const [status, setStatus] = useState('');

  const clear = () => {
    setFullName('');
    setPhoneNumber('');
  };

  const add = async () => {
    setStatus('loading');

    try {
      if ((await firestore.collection('admins').where('phone_number', '==', phone_number).get()).size > 0) {
        alert('Админ уже существует!');
        return;
      }

      await firestore.collection('admins').add({
        phone_number,
        full_name,
      });
      onAdded({phone_number, full_name});
      toggle();
      clear();
    } catch (e) {
      console.log(e);
    } finally {
      setStatus('');
    }
  };

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={show}
      toggle={() => status !== 'loading' && toggle()}
    >
      <div className="modal-header">
        <h5 className="modal-title">
          Добавить администратор
        </h5>
        <button
          aria-label="Close"
          className="close"
          data-dismiss="modal"
          type="button"
          onClick={() => status !== 'loading' && toggle()}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <div className="modal-body">
        <FormGroup>
          <Input
            value={full_name}
            onChange={({target}) => setFullName(target.value)}
            placeholder="Полное имя"
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Input
            value={phone_number}
            onChange={({target}) => setPhoneNumber(target.value)}
            placeholder="Тел номер (996777123456)"
            type="number"
          />
        </FormGroup>
      </div>
      <div className="modal-footer">
        <Button
          disabled={status === 'loading'}
          color="secondary"
          data-dismiss="modal"
          type="button"
          onClick={() => toggle()}
        >
          Отмена
        </Button>
        <Button color="primary" onClick={() => add()} disabled={full_name.length < 1 || phone_number.length !== 12 || status === 'loading'} type="button">
          Добавить
        </Button>
      </div>
    </Modal>
  );
}

export default AddAdminModalComponent;
