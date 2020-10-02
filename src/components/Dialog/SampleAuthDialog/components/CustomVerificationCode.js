import React from 'react';
import ReactInputVerificationCode from 'react-input-verification-code';
import '../../../../assets/styles/CustomVerificationCode.css';

export default function CustomVerificationCode(props) {
  return (
    <div className="verification-code-custom-styles">
      <ReactInputVerificationCode {...props} />
    </div>
  );
}
