import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import CustomForm from '../CustomForm/CustomForm';
import * as authService from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import './LoginPage.scss';

const LoginPage = ({ setIsPanelOpen }) => {
  const [error, setError] = useState('');
  const { setAuthInfo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  const onSubmit = async (e) => {
    e.preventDefault();
    if (e.nativeEvent && e.nativeEvent.target) {
        const { username, password } = Object.fromEntries(new FormData(e.nativeEvent.target));

        try {
            const data = await authService.login(username, password);
            if (data && data.accessToken) {
                setAuthInfo(data, data.accessToken, data.expiresIn);
                navigate('/');
                setIsPanelOpen(!!(!isMobile));
            }
        } catch (err) {
            setError(err?.message || 'Something went wrong! Please try again later!');
        }
    }
};


  useEffect(() => {
    if (location.state?.tokenExpired) {
        setError('Your session has expired. Please log in again.');
    }
}, [location]);

  return (
    <Container className="d-flex justify-content-center align-items-center" id="loginForm">
        <Row>
        <Col>
            <Card className="login-card">
            <Card.Body>
                <CustomForm fields={formFields} onSubmit={onSubmit} title="Sign In" error={error} />
            </Card.Body>
            </Card>
        </Col>
        </Row>
    </Container>
  );
};

export default LoginPage;
