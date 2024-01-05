// CustomForm.js
import React, { useEffect, useRef } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import FormField from '../FormField/FormField';
import './CustomForm.scss';

const CustomForm = ({ enctype, fields, onSubmit, title, submitBtnClass, error }) => {
  const filteredFields = fields.filter(f => !f.fullWidth);


  // Split fields into two columns if there are more than 6 fields
  const colThreshold = 6;
  const firstColFields = filteredFields.slice(0, filteredFields.length > colThreshold ? Math.ceil(filteredFields.length / 2) : filteredFields.length);
  const secondColFields = filteredFields.length > colThreshold ? filteredFields.slice(Math.ceil(filteredFields.length / 2)) : null;

  const fullWidthFields = fields.filter(f => f.fullWidth);

  return (
    <Form onSubmit={onSubmit} encType={enctype || 'application/x-www-form-urlencoded'}>
      {title && <h3 className="text-center my-4">{title}</h3>}
      {error && <Alert variant="danger" className='text-center'>{error}</Alert>}
      <Row>
        <Col md={fields.length > colThreshold ? 6 : 12}>
          {firstColFields.map((field, index) => (
            <FormField
              key={`col1-${index}`}
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
              {...field.inputProps}
            />
          ))}
        </Col>
        {secondColFields && (
          <Col md={6}>
            {secondColFields.map((field, index) => (
              <FormField
                key={`col2-${index}`}
                controlId={field.controlId}
                name={field.name}
                label={field.label}
                icon={field.icon}
                type={field.type}
                options={field.options}
                placeholder={field.placeholder}
                isValid={field.isValid !== undefined ? field.isValid : true}
                feedback={field.feedback}
                required={field.required}
                {...field.inputProps}
              />
            ))}
          </Col>
        )}

        {fullWidthFields && (
          <Col md="12">
            {fullWidthFields.map((field, index) => (
                <Col md="12" key={`fullwidth-${index}`}>
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
                      {...field.inputProps}
                    />
                </Col>
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
