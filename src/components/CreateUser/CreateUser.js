import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { faEnvelope, faUser, faLock, faUserTag } from '@fortawesome/free-solid-svg-icons';
import CustomForm from '../CustomForm/CustomForm';
import * as authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

import './CreateUser.scss';

const CreateUser = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formFields = [
    {
      controlId: 'email',
      name: 'email',
      label: 'Email',
      icon: faEnvelope,
      type: 'email',
      placeholder: 'Enter email',
    },
    {
      controlId: 'username',
      name: 'username',
      label: 'Username',
      icon: faUser,
      type: 'text',
      placeholder: 'Enter username',
    },
    {
      controlId: 'password',
      name: 'password',
      label: 'Password',
      icon: faLock,
      type: 'password',
      placeholder: 'Password',
    },
    {
      controlId: 'userRole',
      name: 'userRole',
      label: 'User Role',
      icon: faUserTag,
      type: 'select',
      options: [
        { value: 'owner', text: 'Owner' },
        { value: 'artist', text: 'Artist' },
        { value: 'subscriber', text: 'Subscriber' }
      ],
      placeholder: 'Select User Role',
    }
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
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
              <CustomForm fields={formFields} onSubmit={onSubmit} title="Create User" error={error} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;
