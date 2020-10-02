import React, { useState } from 'react';
import { TextValidator } from 'react-material-ui-form-validator';

export default function EmailInput({
  isRequired = true,
  onChange = () => {},
  ...props
}) {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  const validators = ['isEmail'];
  const errorMessages = ['فرمت ایمیل نادرست است!'];
  if (isRequired) {
    validators.push('required');
    errorMessages.push('این فیلد اجباریست!');
  }

  return (
    <TextValidator
      type="email"
      required={isRequired}
      fullWidth
      value={value}
      onChange={handleChange}
      variant="outlined"
      autoComplete="off"
      inputProps={{ className: 'ltr-input rtl-placeholder' }}
      validators={['required']}
      errorMessages={['این فیلد اجباریست!']}
      {...props}
    />
  );
}
