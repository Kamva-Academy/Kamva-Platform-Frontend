import React, { useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

ValidatorForm.addValidationRule('isPhone', (value) => {
  return (
    value &&
    ((value.length === 10 && value[0] === '9') ||
      (value.length === 11 && value[0] === '0'))
  );
});

export default function PhoneInput({
  isRequired = true,
  onChange = () => {},
  ...props
}) {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  const validators = ['isPhone'];
  const errorMessages = ['فرمت شماره تلفن نادرست است!'];
  if (isRequired) {
    validators.unshift('required');
    errorMessages.unshift('این فیلد اجباریست!');
  }
  return (
    <TextValidator
      fullWidth
      variant="outlined"
      autoComplete="off"
      value={value}
      onChange={handleChange}
      inputProps={{ className: 'ltr-input rtl-placeholder' }}
      validators={validators}
      errorMessages={errorMessages}
      {...props}
    />
  );
}
