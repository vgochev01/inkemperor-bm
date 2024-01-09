import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { faEnvelope, faUser, faLock, faUserTag } from '@fortawesome/free-solid-svg-icons';
import CustomForm from '../CustomForm/CustomForm';
import * as authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import userFormFields from '../../forms/user';

import './CreateUser.scss';

const CreateUser = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: '',
    userRole: 'owner'
  });

  const formFields = userFormFields(userData, 'create');

  const onSubmit = async (e) => {
    if(e.nativeEvent && e.nativeEvent.target){
      const formData = Object.fromEntries(new FormData(e.nativeEvent.target));

      try {
          const data = await authService.register(formData);
          if (data) {
            navigate('/login');
          }
      } catch(err) {
          setError(err?.message || 'Something went wrong! Please try again later!');
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" id="createUserForm">
      <Row>
        <Col>
          <Card className="create-user-card">
            <Card.Body>
              <CustomForm fields={formFields} customSubmit={onSubmit} data={userData} setData={setUserData} title="Create User" error={error} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;
