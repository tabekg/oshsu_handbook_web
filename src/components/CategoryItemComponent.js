import {Button, ListGroupItem} from "reactstrap";
import React, {useState} from "react";
import firebase from '../utils/firebase';
import {useHistory} from "react-router";

const firestore = firebase.firestore();

function CategoryItemComponent({data, key, onUpdate}) {
  const [status, setStatus] = useState('');
  const history = useHistory();

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
    <ListGroupItem key={key} className={'d-flex justify-content-between align-items-center'}>
      <div style={{cursor: 'pointer'}} onClick={() => history.push(`/category/${data.id}`)} className={'flex-grow-1'}>{data.title}</div>
      <div>
        <Button disabled={status.endsWith('ing')} onClick={edit} type={'button'} size={'sm'}
                color={'info'}>Редактировать</Button>
        <Button disabled={status.endsWith('ing') || true} type={'button'} size={'sm'} color={'danger'}>Удалить</Button>
      </div>
    </ListGroupItem>
  );
}

export default CategoryItemComponent;
