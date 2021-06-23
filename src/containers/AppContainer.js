import React, {useState} from "react";
import AuthContainer from "./AuthContainer";
import firebase from "../utils/firebase";
import HomeContainer from "./HomeContainer";
import {
  Container,
  Navbar,
  NavbarBrand, Spinner,
} from "reactstrap";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import CategoryContainer from "./CategoryContainer";

const auth = firebase.auth();
const firestore = firebase.firestore();

function AppContainer() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading');

  auth.onAuthStateChanged((u) => {
    if (u) {
      setUser(u);
      checkUser().then();
    } else {
      setUser(null);
    }
    setStatus('loaded');
  });

  const checkUser = async () => {
    if (!user) return;
    try {
      const r = await firestore.collection('admins').where('phone_number', '==', user.phoneNumber.slice(1)).get();
      if (r.size < 1) {
        await auth.signOut();
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (status === 'loading') {
    return (
      <div style={{height: '100vh'}} className={'d-flex justify-content-center align-items-center'}>
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <>
      {user ? (
        <>

          <Router>
            <>
                <Navbar
                  className="navbar-horizontal navbar-dark bg-primary"
                  expand="lg"
                >
                  <Container className={'justify-content-center'}>
                    <NavbarBrand href="/" className={'text-center d-block'} onClick={e => e.preventDefault()}>
                      Справочник ОшГУ
                    </NavbarBrand>
                  </Container>
                </Navbar>

                <Switch>
                  <Route path="/" exact render={props => <HomeContainer user={user} {...props} />} />
                  {/*<Route*/}
                  {/*  path="/landing-page"*/}
                  {/*  exact*/}
                  {/*  render={props => <Landing {...props} />}*/}
                  {/*/>*/}
                  <Route path="/category/:id" exact render={props => <CategoryContainer {...props} />} />
                  {/*<Route path="/profile-page" exact render={props => <Profile {...props} />} />*/}
                  {/*<Route path="/register-page" exact render={props => <Register {...props} />} />*/}
                  <Redirect to="/" />
                </Switch>

              </>
          </Router>

        </>
      ) : (
        <AuthContainer/>
      )}
    </>
  );
}

export default AppContainer;
