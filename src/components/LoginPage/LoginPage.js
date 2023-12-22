import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import CustomForm from '../CustomForm/CustomForm';
import * as authService from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import './LoginPage.scss';

const LoginPage = () => {
  const { updateAuthState } = useAuth();
  const navigate = useNavigate();

  const formFields = [
    {
      controlId: 'username',
      name: 'username',
      label: 'Username',
      icon: faUser,
      type: 'text',
      placeholder: 'Enter username',
      inputProps: {
      }
    },
    {
      controlId: 'password',
      name: 'password',
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
    if(e.nativeEvent && e.nativeEvent.target){
      const { username, password } = Object.fromEntries(new FormData(e.nativeEvent.target));

      try {
          const data = await authService.login(username, password);
          if (data && data.accessToken) {
            updateAuthState({ email: data.email, username: data.username }, data.accessToken);
            navigate('/');
          }
      } catch(err) {
          alert(err);
      }
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
