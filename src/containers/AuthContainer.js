import React, {useEffect, useState} from "react";
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
const firestore = firebase.firestore();

function AuthContainer() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        console.log(response);
        //signIn();
      }
    });
  });

  const signIn = () => {
    setStatus('checking');
    firestore.collection('admins').where('phone_number', '==', `+${phoneNumber}`).get().then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        setStatus('signing');
        const appVerifier = window.recaptchaVerifier;
        auth.signInWithPhoneNumber(`+${phoneNumber}`, appVerifier).then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setStatus('sent');
        }).catch((error) => {
          console.log(error);
          setStatus('');
        });
      } else {
        alert('Админ не найден!');
        setStatus('');
      }
    }).catch((error) => {
      console.log(error);
      setStatus('');
    });
  };

  const submit = () => {
    if (status === 'sent') {
      verify();
    } else if (status === '') {
      signIn();
    }
  };

  const verify = () => {
    setStatus('verifying');
    window.confirmationResult.confirm(verificationCode).then((result) => {
      const user = result.user;
      console.log(result);
    }).catch((error) => {
      console.log(error);
      if ('code' in error) {
        if (error.code === 'auth/invalid-verification-code') {
          alert('Неверный код!');
        }
      }
      setStatus('sent');
    });
  };

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
                          <i className="fa fa-phone"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={({target}) => setPhoneNumber(target.value)}
                        value={phoneNumber}
                        className="form-control-alternative"
                        placeholder="Телефон номер"
                        type="text"
                      />
                    </InputGroup>
                    {['sent', 'verifying', 'signing'].includes(status) && (
                      <InputGroup className="input-group-alternative mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-key"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          onChange={({target}) => setVerificationCode(target.value)}
                          value={verificationCode}
                          className="form-control-alternative"
                          placeholder="Код подтверждения"
                          type="number"
                        />
                      </InputGroup>
                    )}
                  </FormGroup>
                  <Button disabled={
                    ['checking', 'verifying', 'signing'].includes(status) ||
                    (status === 'sent' && verificationCode.length !== 6) ||
                    (status === '' && phoneNumber.length !== 12)
                  } id={'sign-in-button'} onClick={() => submit()} color="primary" block type="button">
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

export default AuthContainer;
