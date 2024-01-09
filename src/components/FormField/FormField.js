import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormField = ({ controlId, name, label, icon, type, placeholder, options, required, isValid, feedback, date, setDate, onBlur, ...rest }) => {
  return (
    <Form.Group controlId={controlId} className={`form-group ${required && 'required'}`}>
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
              <>
                <Form.Control as="select" onBlur={onBlur} name={name} className="custom-select" {...rest} isInvalid={!isValid}>
                  {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.text}</option>
                  ))}
                </Form.Control>
                <FontAwesomeIcon icon={faChevronDown} /> {/* Use the appropriate FontAwesome icon */}
              </>
            ) : type === 'textarea' ? (
              <Form.Control as="textarea" onBlur={onBlur} name={name} rows={3} placeholder={placeholder} isInvalid={!isValid} {...rest} />
            ) : type === 'datetime-local' ? (
              <ReactDatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                name={name}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy HH:mm"
                onBlur={onBlur}
              />
            ) : (
              <Form.Control
                type={type}
                name={name}
                placeholder={placeholder}
                isInvalid={!isValid}
                size={type === 'file' ? 'lg' : ''}
                onBlur={onBlur}
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
