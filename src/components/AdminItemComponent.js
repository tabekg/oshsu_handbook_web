import {Button, ListGroupItem} from "reactstrap";
import React, {useState} from "react";
import firebase from '../utils/firebase';

const firestore = firebase.firestore();

function AdminItemComponent({data, key, onDeleted}) {
  const [status, setStatus] = useState('');

  const remove = async () => {
    if (!window.confirm('Вы уверены?')) return;
    try {
      setStatus('deleting');
      await firestore.collection('admins').doc(data.id).delete();
      onDeleted(data.id);
    } catch (e) {
      console.log(e);
      setStatus('');
    }
  };

  return (
    <ListGroupItem key={key} className={'d-flex justify-content-between align-items-center'}>
      <div>{data.full_name} (+{data.phone_number})</div>
      <div>
        <Button disabled={status.endsWith('ing')} type={'button'} size={'sm'} color={'info'}>Редактировать</Button>
        <Button disabled={status.endsWith('ing')} onClick={() => remove()} type={'button'} size={'sm'} color={'danger'}>Удалить</Button>
      </div>
    </ListGroupItem>
  );
}

export default AdminItemComponent;
