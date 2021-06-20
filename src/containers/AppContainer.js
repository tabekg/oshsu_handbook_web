import React, {useState} from "react";
import AuthContainer from "./AuthContainer";
import firebase from "../utils/firebase";
import HomeContainer from "./HomeContainer";
import {
  Container,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";


const auth = firebase.auth();

function AppContainer() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading');

  auth.onAuthStateChanged((u) => {
    if (u) {
      setUser(u);
    } else {
      console.log('no user');
    }
    setStatus('loaded');
  });

  if (status === 'loading') {
    return <h1>Please, wait!</h1>;
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
                  {/*<Route path="/login-page" exact render={props => <Login {...props} />} />*/}
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
