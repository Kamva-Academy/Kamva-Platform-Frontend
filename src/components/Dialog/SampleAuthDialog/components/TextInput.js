import React, { useState } from 'react';
import { TextValidator } from 'react-material-ui-form-validator';

export default function TextInput({
  isRequired = true,
  onChange = () => {},
  ...props
}) {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  const validators = [];
  const errorMessages = [];
  if (isRequired) {
    validators.push('required');
    errorMessages.push('این فیلد اجباریست!');
  }
  return (
    <TextValidator
      required={isRequired}
      fullWidth
      value={value}
      onChange={handleChange}
      variant="outlined"
      autoComplete="off"
      validators={validators}
      errorMessages={errorMessages}
      {...props}
    />
  );
}
