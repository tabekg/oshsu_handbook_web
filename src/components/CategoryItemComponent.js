import {Button, ListGroupItem} from "reactstrap";
import React, {useState} from "react";

function CategoryItemComponent({data, key}) {
  const [status, setStatus] = useState('');

  const edit = () => {
    setStatus('editing');
    try {
      const title = window.prompt('Название?', data.title);
      
    } catch (e) {
      console.log(e);
    } finally {
      setStatus('');
    }
  };

  return (
    <ListGroupItem key={key} className={'d-flex justify-content-between align-items-center'}>
      <div>{data.title}</div>
      <div>
        <Button disabled={status.endsWith('ing')} onClick={() => edit()} type={'button'} size={'sm'} color={'info'}>Редактировать</Button>
        <Button disabled={status.endsWith('ing') || true} type={'button'} size={'sm'} color={'danger'}>Удалить</Button>
      </div>
    </ListGroupItem>
  );
}

export default CategoryItemComponent;
