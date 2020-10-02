import { IconButton, InputAdornment } from '@material-ui/core';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { TextValidator } from 'react-material-ui-form-validator';

export default function PasswordInput({
  isRequired = true,
  onChange = () => {},
  ...props
}) {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };
  const [showPassword, setShowPassword] = useState();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
      type={showPassword ? 'text' : 'password'}
      fullWidth
      value={value}
      onChange={handleChange}
      variant="outlined"
      autoComplete="off"
      inputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(true)}
              onMouseDown={handleMouseDownPassword}>
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
        className: 'ltr-input rtl-placeholder',
      }}
      validators={['required']}
      errorMessages={['این فیلد اجباریست!']}
      {...props}
    />
  );
}
