import React, {useEffect, useState} from "react";
import {
  Button,
  Container, Spinner,
} from "reactstrap";
import firebase from "../utils/firebase";
import EmployeeItemComponent from "../components/EmployeeItemComponent";
import {useParams} from "react-router";
import AddEmployeeModalComponent from "../components/AddEmployeeModalComponent";

const firestore = firebase.firestore();

function CategoryContainer({user}) {
  const params = useParams();
  const [item_status, setItemStatus] = useState(null);
  const [employees_status, setEmployeesStatus] = useState(null);
  const [item, setItem] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [show_add_employee_form, setShowAddEmployeeForm] = useState(false);

  const fetchCategory = async () => {
    setItemStatus('loading');
    try {
      const result = (await firestore.collection('categories').doc(params.id).get()).data();
      setItem(result);
      setItemStatus('success');
    } catch (e) {
      console.log(e);
      setItemStatus('error');
    }
  };

  const fetchEmployee = async () => {
    setEmployeesStatus('loading');
    try {
      const result = await firestore.collection('employees').where('category_id', '==', params.id).get();
      setEmployees(result.docs.map((v) => v.data()));
      setEmployeesStatus('success');
    } catch (e) {
      console.log(e);
      setEmployeesStatus('error');
    }
  };

  const addEmployee = () => {
  //   const title = prompt('Название?');
  //   if (title && title.trim().length > 0) {
  //     setAddingCategory(true);
  //     firestore.collection('categories').add({
  //       title,
  //     }).then(response => {
  //       console.log(response);
  //       setCategories([...categories, {title}]);
  //     }).catch(e => {
  //       console.log(e);
  //     }).finally(() => {
  //       setAddingCategory(false);
  //     });
  //   }
  };

  useEffect(() => {
    fetchCategory().then(() => {
      fetchEmployee().then();
    });
  }, []);

  return (
    <>
      <AddEmployeeModalComponent
        categoryId={params.id}
        onAdded={data => setEmployees([...employees, data])}
        show={show_add_employee_form}
        toggle={() => setShowAddEmployeeForm(!show_add_employee_form)}
      />

      <Container className={'mb-3'}>
        <div>
          {item_status === 'success' && (
            <>
              <div className={'d-flex justify-content-between align-items-center'}>
                <h3 className={'my-2'}>{item.title}{item_status === 'success' ? ` (${employees.length})` : ''}</h3>
                <Button onClick={() => setShowAddEmployeeForm(true)} color="success" disabled={item_status !== 'success'} type="button">Добавить</Button>
              </div>
              {employees_status === 'success' && (
                <>
                  {employees.map((v) => (
                    <EmployeeItemComponent key={v.id} data={v} />
                  ))}
                </>
              )}
            </>
          )}
          {(item_status === 'loading' || employees_status === 'loading') && (
            <div className={'d-flex justify-content-center align-items-center'} style={{height: '20vh'}}>
              <Spinner color="primary" />
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

export default CategoryContainer;
