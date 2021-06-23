import {Button, FormGroup, Input, Modal} from "reactstrap";
import React, {useState} from "react";
import firebase from "../utils/firebase";

const firestore = firebase.firestore();

function AddEmployeeModalComponent({show, toggle, onAdded, categoryId}) {
  const [phone_number, setPhoneNumber] = useState('');
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [work_phones, setWorkPhones] = useState('');
  const [mobile_phones, setMobilePhones] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('');

  const clear = () => {
    setFullName('');
    setPhoneNumber('');
    setEmail('');
    setWorkPhones('');
    setMobilePhones('');
    setPosition('');
  };

  const add = async () => {
    setStatus('loading');

    try {
      if ((await firestore.collection('employees').where('phone_number', '==', phone_number).get()).size > 0) {
        alert('Сотрудник уже существует!');
        return;
      }

      const item = {
        phone_number,
        full_name,
        position,
        category_id: categoryId,
        email: email.split(',').filter(v => v.trim().length > 0),
        work_phone: work_phones.split(',').filter(v => v.trim().length > 0),
        mobile_phone: mobile_phones.split(',').filter(v => v.trim().length > 0),
      };
      await firestore.collection('employees').add(item);
      onAdded(item);
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
          Добавить сотрудник
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
            value={position}
            onChange={({target}) => setPosition(target.value)}
            placeholder="Должность"
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Input
            value={phone_number}
            onChange={({target}) => setPhoneNumber(target.value)}
            placeholder="Основной тел номер (996777123456)"
            type="number"
          />
        </FormGroup>
        <FormGroup>
          <Input
            value={email}
            onChange={({target}) => setEmail(target.value)}
            placeholder="Почта"
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Input
            value={mobile_phones}
            onChange={({target}) => setMobilePhones(target.value)}
            placeholder="Номера мобильных телефонов"
            type="text"
          />
        </FormGroup>
        <FormGroup>
          <Input
            value={work_phones}
            onChange={({target}) => setWorkPhones(target.value)}
            placeholder="Номера рабочих телефонов"
            type="text"
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
        <Button color="primary" onClick={() => add()} disabled={position.length < 1 || full_name.length < 1 || status === 'loading'} type="button">
          Добавить
        </Button>
      </div>
    </Modal>
  );
}

export default AddEmployeeModalComponent;
