import {Button, ListGroupItem} from "reactstrap";
import React from "react";

function AdminItemComponent({data, key}) {
  return (
    <ListGroupItem key={key} className={'d-flex justify-content-between align-items-center'}>
      <div>{data.full_name} (+{data.phone_number})</div>
      <div>
        <Button type={'button'} size={'sm'} color={'info'}>Редактировать</Button>
        <Button type={'button'} size={'sm'} color={'danger'}>Удалить</Button>
      </div>
    </ListGroupItem>
  );
}

export default AdminItemComponent;
