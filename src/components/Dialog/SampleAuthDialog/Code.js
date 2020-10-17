// import React, { useState } from 'react';
// import { Typography } from '@material-ui/core';
// import CustomVerificationCode from './components/CustomVerificationCode';
// import SendCodeBtn from './components/SendCodeBtn';
// import FromTemplate from './pageTemplate/FormTemplate';
// import { loginByPhoneCode } from '../../../redux/actions/account';
// import { connect } from 'react-redux';

// function Code({ loginByPhoneCode, auth_data }) {
//   const [code, setCode] = useState('');

//   const onSubmit = () => {
//     loginByPhoneCode({ code, phone_number: auth_data.phone_number });
//   };

//   return (
//     <FromTemplate
//       onSubmit={onSubmit}
//       title="ورود"
//       submitText="ورود"
//       formContent={
//         <>
//           <Typography component="h4" variant="h5" align="left">
//             کد ارسال شده را وارد نمایید:
//           </Typography>
//           <CustomVerificationCode
//             length={6}
//             placeholder=""
//             onChange={setCode}
//           />
//         </>
//       }
//       formAction={<SendCodeBtn />}
//     />
//   );
// }

// const mapStateToProps = (state) => ({
//   auth_data: state.account.auth_data,
// });

// export default connect(mapStateToProps, { loginByPhoneCode })(Code);
