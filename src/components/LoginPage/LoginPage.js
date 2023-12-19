import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './LoginPage.scss';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (username !== 'admin') {
      setError('Authorization failed. Please try again.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      // Error handling logic here
    }
    // Proceed with the form submission
  };

  return (
    <Container className="d-flex justify-content-center align-items-center login-container">
      <Row>
        <Col>
          <Card className="login-card">
            <Card.Body>
              <Form className="login-form" noValidate onSubmit={handleSubmit}>
                <h3 className="text-center mb-4">Sign In</h3>

                {error && <Alert variant="danger" className='text-center'>{error}</Alert>}

                <Form.Group controlId="formBasicEmail" className='form-group'>
                  <Form.Label>Username</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      isInvalid={!!error}
                    />
                    <Form.Control.Feedback type="invalid">
                      {error}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className='form-group'>
                  <Form.Label>Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      isInvalid={!!error}
                    />
                    <Form.Control.Feedback type="invalid">
                      {error}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
