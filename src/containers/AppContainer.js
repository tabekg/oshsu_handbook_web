import React from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container, Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import firebase from "../utils/firebase";

const auth = firebase.auth();

function AppContainer() {
  return (
    <>
      <Container>
        <Row className={'justify-content-center vh-100 align-items-center'}>
          <Col xl={5} xs={12} sm={12} md={6} lg={5}>
            <h2 className={'text-center mb-4'}>Справочник ОшГУ</h2>
            <Card className={'shadow'}>
              <CardBody>
                <Form>
                  <FormGroup>
                    <InputGroup className="input-group-alternative mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-phone" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        className="form-control-alternative"
                        placeholder="Телефон номер"
                        type="text"
                      />
                    </InputGroup>
                  </FormGroup>
                  <Button color="primary" block type="button">
                    Войти в систему
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AppContainer;
