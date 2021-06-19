import React, {useState} from "react";
import AuthContainer from "./AuthContainer";
import firebase from "../utils/firebase";
import HomeContainer from "./HomeContainer";
import {
  Col,
  Container, DropdownItem, DropdownMenu,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  Row,
  UncontrolledCollapse,
  UncontrolledDropdown
} from "reactstrap";
import {Link, NavLink, BrowserRouter as Router, Route} from "react-router-dom";


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
                  <Container>
                    <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                      Справочник ОшГУ
                    </NavbarBrand>
                    <button
                      aria-controls="navbar-primary"
                      aria-expanded={false}
                      aria-label="Toggle navigation"
                      className="navbar-toggler"
                      data-target="#navbar-primary"
                      data-toggle="collapse"
                      id="navbar-primary"
                      type="button"
                    >
                      <span className="navbar-toggler-icon" />
                    </button>
                    <UncontrolledCollapse navbar toggler="#navbar-primary">
                      <div className="navbar-collapse-header">
                        <Row>
                          <Col className="collapse-brand" xs="6">
                            <Link to="/">
                              <img
                                alt="..."
                                src={require("assets/img/brand/blue.png")}
                              />
                            </Link>
                          </Col>
                          <Col className="collapse-close" xs="6">
                            <button
                              aria-controls="navbar-primary"
                              aria-expanded={false}
                              aria-label="Toggle navigation"
                              className="navbar-toggler"
                              data-target="#navbar-primary"
                              data-toggle="collapse"
                              id="navbar-primary"
                              type="button"
                            >
                              <span />
                              <span />
                            </button>
                          </Col>
                        </Row>
                      </div>
                      <Nav className="ml-lg-auto" navbar>
                        <NavItem>
                          <NavLink to="#pablo" className={'text-light'} onClick={e => e.preventDefault()}>
                            Категории <span className="sr-only">(current)</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink to="#pablo" className={'text-light'} onClick={e => e.preventDefault()}>
                            Сотрудники
                          </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav>
                          <NavLink
                            aria-expanded={false}
                            aria-haspopup={true}
                            data-toggle="dropdown"
                            to="#pablo"
                            id="navbar-primary_dropdown_1"
                            onClick={e => e.preventDefault()}
                            role="button"
                            className={'text-light'}
                          >
                            Администраторы
                          </NavLink>
                          <DropdownMenu
                            aria-labelledby="navbar-primary_dropdown_1"
                            right
                          >
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Another action
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </Nav>
                    </UncontrolledCollapse>
                  </Container>
                </Navbar>

                <HomeContainer user={user}/>
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
