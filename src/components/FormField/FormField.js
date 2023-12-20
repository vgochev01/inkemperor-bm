// FormField.js
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FormField = ({ controlId, name, label, icon, type, placeholder, options, isValid, feedback, ...rest }) => {
  return (
    <Form.Group controlId={controlId} className='form-group'>
      {type === 'checkbox' || type === 'radio' ? (
        // Render a checkbox or radio button
        <Form.Check
          type={type}
          name={name}
          label={label}
          {...rest} // Include all other props like name, checked, onChange, etc.
          isInvalid={!isValid}
        />
      ) : (
        // Render a standard input, select field, or textarea
        <>
          <Form.Label>{label}</Form.Label>
          <InputGroup hasValidation>
            {icon && type !== 'textarea' && <InputGroup.Text><FontAwesomeIcon icon={icon} /></InputGroup.Text>}
            {type === 'select' ? (
              <Form.Control as="select" name={name} {...rest} isInvalid={!isValid}>
                {options.map((option, index) => (
                  <option key={index} value={option.value}>{option.text}</option>
                ))}
              </Form.Control>
            ) : type === 'textarea' ? (
              <Form.Control as="textarea" name={name} rows={3} placeholder={placeholder} isInvalid={!isValid} {...rest} />
            ) : (
              <Form.Control
                type={type}
                name={name}
                placeholder={placeholder}
                isInvalid={!isValid}
                size={type === 'file' ? 'lg' : ''}
                {...rest} // Include all other props like value, onChange, etc.
              />
            )}
            <Form.Control.Feedback type="invalid">{feedback}</Form.Control.Feedback>
          </InputGroup>
        </>
      )}
    </Form.Group>
  );
};

export default FormField;
