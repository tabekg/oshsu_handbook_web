import React, {useEffect, useState} from "react";
import {
  Button,
  Container, Spinner,
} from "reactstrap";
import firebase from "../utils/firebase";
import AddAdminModalComponent from "../components/AddAdminModalComponent";
import CategoryItemComponent from "../components/CategoryItemComponent";
import AdminItemComponent from "../components/AdminItemComponent";

const firestore = firebase.firestore();

function HomeContainer({user}) {
  const [show_add_admin_form, setShowAddAdminForm] = useState(false);
  const [admin_status, setAdminStatus] = useState(null);
  const [category_status, setCategoryStatus] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adding_category, setAddingCategory] = useState(false);

  const fetchAdmin = () => {
    setAdminStatus('loading');
    firestore.collection('admins').get().then((result) => {
      console.log(result);
      setAdmins(result.docs.map(v => ({...v.data(), id: v.id})));
      setAdminStatus('success');
    }).catch(e => {
      console.log(e);
      setAdminStatus('error');
    });
  };

  const fetchCategory = () => {
    setCategoryStatus('loading');
    firestore.collection('categories').get().then((result) => {
      console.log(result);
      setCategories(result.docs.map(v => ({...v.data(), id: v.id})));
      setCategoryStatus('success');
    }).catch(e => {
      console.log(e);
      setCategoryStatus('error');
    });
  };

  const addAdmin = () => {
    setShowAddAdminForm(true);
  };

  const addCategory = () => {
    const title = prompt('Название?');
    if (title && title.trim().length > 0) {
      setAddingCategory(true);
      firestore.collection('categories').add({
        title,
      }).then(response => {
        console.log(response);
        setCategories([...categories, {title}]);
      }).catch(e => {
        console.log(e);
      }).finally(() => {
        setAddingCategory(false);
      });
    }
  };

  useEffect(() => {
    fetchAdmin();
    fetchCategory();
  }, []);

  const setCategory = (e) => {
    setCategories(categories.map(v => {
      if (e.id === v.id) return e;
      return v;
    }));
  };

  return (
    <>
      <AddAdminModalComponent
        onAdded={data => setAdmins([...admins, data])}
        show={show_add_admin_form}
        toggle={() => setShowAddAdminForm(!show_add_admin_form)}
      />

      <Container className={'mb-3'}>
        <div>
          <div className={'d-flex justify-content-between align-items-center'}>
            <h3 className={'my-2'}>Категории{category_status === 'success' ? ` (${categories.length})` : ''}</h3>
            <Button onClick={() => addCategory()} color="success" disabled={category_status !== 'success' || adding_category} type="button">Добавить</Button>
          </div>
          {category_status === 'success' && categories.length > 0 && (
            <>
              {categories.map((v) => (
                <CategoryItemComponent key={v.id} onUpdate={e => setCategory(e)} data={v} />
              ))}
            </>
          )}
          {category_status === 'loading' && (
            <div className={'d-flex justify-content-center align-items-center'} style={{height: '20vh'}}>
              <Spinner color="primary" />
            </div>
          )}
        </div>
        <div>
          <div className={'d-flex justify-content-between align-items-center'}>
            <h3 className={'my-2'}>Администраторы{admin_status === 'success' ? ` (${admins.length})` : ''}</h3>
            <Button color="success" onClick={() => addAdmin()} disabled={admin_status !== 'success'} type="button">Добавить</Button>
          </div>
          {admin_status === 'success' && admins.length > 0 && (
            <>
              {admins.map((v) => (
                <AdminItemComponent onDeleted={(id) => setAdmins(admins.filter(v => v.id !== id))} key={v.id} data={v} />
              ))}
            </>
          )}
          {admin_status === 'loading' && (
            <div className={'d-flex justify-content-center align-items-center'} style={{height: '20vh'}}>
              <Spinner color="primary" />
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

export default HomeContainer;
