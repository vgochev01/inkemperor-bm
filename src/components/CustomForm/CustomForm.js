// CustomForm.js
import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormField from '../FormField/FormField';
import './CustomForm.scss';

const CustomForm = ({ fields, onSubmit, title, submitBtnClass }) => {
  // Split fields into two columns if there are more than 6 fields
  const colThreshold = 6;
  const firstColFields = fields.slice(0, fields.length > colThreshold ? Math.ceil(fields.length / 2) : fields.length);
  const secondColFields = fields.length > colThreshold ? fields.slice(Math.ceil(fields.length / 2)) : null;

  return (
    <Form onSubmit={onSubmit}>
      {title && <h3 className="text-center mb-4">{title}</h3>}
      <Row>
        <Col md={fields.length > colThreshold ? 6 : 12}>
          {firstColFields.map((field, index) => (
            <FormField
              key={index}
              controlId={field.controlId}
              name={field.name}
              label={field.label}
              icon={field.icon}
              type={field.type}
              options={field.options}
              placeholder={field.placeholder}
              isValid={field.isValid !== undefined ? field.isValid : true}
              feedback={field.feedback}
              {...field.inputProps}
            />
          ))}
        </Col>
        {secondColFields && (
          <Col md={6}>
            {secondColFields.map((field, index) => (
              <FormField
                key={index + firstColFields.length} // Ensure unique key
                controlId={field.controlId}
                name={field.name}
                label={field.label}
                icon={field.icon}
                type={field.type}
                options={field.options}
                placeholder={field.placeholder}
                isValid={field.isValid !== undefined ? field.isValid : true}
                feedback={field.feedback}
                {...field.inputProps}
              />
            ))}
          </Col>
        )}
      </Row>
      <Button variant="primary" type="submit" className={`w-100 mt-3 ${submitBtnClass || ''}`} id="submitFormBtn">
        Submit
      </Button>
    </Form>
  );
};

export default CustomForm;
