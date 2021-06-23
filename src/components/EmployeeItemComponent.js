import {Button, ListGroupItem} from "reactstrap";
import React, {useState} from "react";
import firebase from '../utils/firebase';

const firestore = firebase.firestore();

function EmployeeItemComponent({data, key, onUpdate}) {
  const [status, setStatus] = useState('');

  const edit = async () => {
    setStatus('editing');
    try {
      const title = window.prompt('Название?', data.title);
      if (!title) return;
      const r = await firestore.collection('categories').doc(data.id).update({
        title,
      });
      onUpdate({...data, title});
      console.log(r);
    } catch (e) {
      console.log(e);
    } finally {
      setStatus('');
    }
  };

  return (
    <>
      <ListGroupItem key={key} className={'d-flex justify-content-between align-items-center'}>
        <div className={'flex-grow-1'}><strong>{data.position}</strong> {data.full_name}</div>
        <div>
          <Button disabled={status.endsWith('ing') || true} onClick={edit} type={'button'} size={'sm'}
                  color={'info'}>Редактировать</Button>
          <Button disabled={status.endsWith('ing') || true} type={'button'} size={'sm'}
                  color={'danger'}>Удалить</Button>
        </div>
      </ListGroupItem>
    </>
  );
}

export default EmployeeItemComponent;
