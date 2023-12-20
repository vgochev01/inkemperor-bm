import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import CustomForm from '../CustomForm/CustomForm';
import * as authService from '../../services/authService';

import './LoginPage.scss';

const LoginPage = () => {
  const formFields = [
    {
      controlId: 'username',
      label: 'Username',
      icon: faUser,
      type: 'text',
      placeholder: 'Enter username',
      inputProps: {
      }
    },
    {
      controlId: 'password',
      label: 'Password',
      icon: faLock,
      type: 'password',
      placeholder: 'Password',
      inputProps: {
      }
    }
  ];

  const [fields, setFields] = useState(formFields);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    try {
        const data = await authService.login(formData);
        // setUser
        // navigate
    } catch(err) {
        alert(err);
    }

  };

  return (
    <Container className="d-flex justify-content-center align-items-center" id="loginForm">
        <Row>
        <Col>
            <Card className="login-card">
            <Card.Body>
                <CustomForm fields={fields} onSubmit={onSubmit} title="Sign In" />
            </Card.Body>
            </Card>
        </Col>
        </Row>
    </Container>
  );
};

export default LoginPage;
