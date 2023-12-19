import React from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import './LoginPage.scss';

const LoginPage = () => {

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
    <Container className="d-flex justify-content-center align-items-center login-container">
        <Row>
        <Col>
            <Card className="login-card">
            <Card.Body>
                <Form className="login-form" onSubmit={onSubmit}>
                <h3 className="text-center mb-4">Sign In</h3>

                <Form.Group controlId="formBasicEmail" className='form-group'>
                    <Form.Label>Username</Form.Label>
                    <div className="input-group">
                    <span className="input-group-text" id="basic-addon1">
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <Form.Control type="text" placeholder="Enter username" />
                    </div>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className='form-group'>
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                    <span className="input-group-text" id="basic-addon2">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <Form.Control type="password" placeholder="Password" />
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
