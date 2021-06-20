import {Button, ListGroupItem} from "reactstrap";
import React from "react";

function CategoryItemComponent({data, key}) {
  return (
    <ListGroupItem key={key} className={'d-flex justify-content-between align-items-center'}>
      <div>{data.title}</div>
      <div>
        <Button type={'button'} size={'sm'} color={'info'}>Редактировать</Button>
        <Button type={'button'} size={'sm'} color={'danger'}>Удалить</Button>
      </div>
    </ListGroupItem>
  );
}

export default CategoryItemComponent;
