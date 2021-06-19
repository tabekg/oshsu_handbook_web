import React, {useEffect, useState} from "react";
import {
  Col,
  Container,
  Row
} from "reactstrap";
import firebase from "../utils/firebase";

const firestore = firebase.firestore();

function HomeContainer(props) {
  return (
    <>
      <Container>
        <Row className={'justify-content-center vh-100 align-items-center'}>
          <Col xl={5} xs={12} sm={12} md={6} lg={5}>
            <h2 className={'text-center mb-4'}>{props.user.phoneNumber}</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomeContainer;
