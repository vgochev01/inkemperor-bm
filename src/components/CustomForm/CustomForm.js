// CustomForm.js
import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import FormField from '../FormField/FormField';
import { useAuth } from '../../context/AuthContext';
import './CustomForm.scss';
import { useNavigate } from 'react-router-dom';

const CustomForm = ({ enctype, fields, data = {}, setData, customSubmit, customInputChange, title, submitBtnClass, error, auth = true }) => {
  const [validationState, setValidationState] = useState({});
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const validateField = (name, value, field) => {
      if (field.required) {
          return value.trim() !== '';
      }
      return true;
  };

  const handleBlur = (e) => {
      const { name, value } = e.target;
      const field = fields.find(f => f.name === name);
      const isValid = validateField(name, value, field);
      setValidationState(prevState => ({ ...prevState, [name]: isValid }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    // Set the state based on input type
    setData(prevState => {
        return {
            ...prevState,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
        };
    });

    if (typeof customInputChange === 'function') {
      customInputChange(e, data, setData, setValidationState);
    }

    setValidationState(prevState => ({ ...prevState, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(auth && (!user || !isAuthenticated)) {
      navigate('/login');
      return;
    }

    const isFormValid = fields.every(field => validateField(field.name, data[field.name], field));
    if (!isFormValid) {
        // Update validation state for all fields
        const newValidationState = {};
        fields.forEach(field => {
          newValidationState[field.name] = validateField(field.name, data[field.name], field);
        });
        setValidationState(newValidationState);
        return;
    }

    customSubmit(e);
  }

  const extendedFields = fields.map(field => {
      const isValid = validationState[field.name] !== false;
      field.isValid = isValid;
      if(field.inputProps) {
        field.inputProps.onChange = handleInputChange;
      } else {
        field.inputProps = { onChange: handleInputChange };
      }

      return field;
  });

  const filteredFields = extendedFields.filter(f => !f.fullWidth);

  // Split fields into two columns if there are more than 6 fields
  const colThreshold = 6;
  const firstColFields = filteredFields.slice(0, filteredFields.length > colThreshold ? Math.ceil(filteredFields.length / 2) : filteredFields.length);
  const secondColFields = filteredFields.length > colThreshold ? filteredFields.slice(Math.ceil(filteredFields.length / 2)) : null;

  const fullWidthFields = extendedFields.filter(f => f.fullWidth);

  const renderField = (field, index) => (
    <Col md={field.fullWidth ? 12 : 6} key={field.controlId}>
      <FormField
        controlId={field.controlId}
        name={field.name}
        label={field.label}
        icon={field.icon}
        type={field.type}
        options={field.options}
        placeholder={field.placeholder}
        isValid={field.isValid !== undefined ? field.isValid : true}
        feedback={field.feedback}
        date={field.date || new Date()}
        setDate={field.setDate}
        required={field.required}
        onBlur={handleBlur}
        {...field.inputProps}
      />
    </Col>
  );

  return (
    <Form onSubmit={handleSubmit} encType={enctype || 'application/x-www-form-urlencoded'}>
      {title && <h3 className="text-center my-4">{title}</h3>}
      {error && <Alert variant="danger" className='text-center'>{error}</Alert>}
      <Row>
        {fields.map((field, index) => renderField(field, index))}
      </Row>
      <Button variant="primary" type="submit" className={`w-100 mt-3 ${submitBtnClass || ''}`} id="submitFormBtn">
        Submit
      </Button>
    </Form>
  );
};

export default CustomForm;
