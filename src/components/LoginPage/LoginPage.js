import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CustomForm from '../CustomForm/CustomForm';
import * as authService from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import userFormFields from '../../forms/user';
import './LoginPage.scss';

const LoginPage = ({ setIsPanelOpen }) => {
  const [error, setError] = useState('');
  const { setAuthInfo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({
    username: '',
    password: ''
  })

  const formFields = userFormFields(userData, 'login');

  const onSubmit = async (e) => {
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
                <CustomForm auth={false} fields={formFields} customSubmit={onSubmit} data={userData} setData={setUserData} title="Sign In" error={error} />
            </Card.Body>
            </Card>
        </Col>
        </Row>
    </Container>
  );
};

export default LoginPage;
