// import React, { useState } from 'react';
// import { Button } from '@material-ui/core';
// import FromTemplate from './pageTemplate/FormTemplate';
// import PasswordInput from './components/PasswordInput';
// import {
//   loginByPhonePassword,
//   phoneAuth,
// } from '../../../redux/actions/account';
// import { connect } from 'react-redux';

// function EmailAndPassword({ phoneAuth, auth_data, loginByPhonePassword }) {
//   const [password, setPassword] = useState('');

//   const onSubmit = () => {
//     loginByPhonePassword({ password, phone_number: auth_data.phone_number });
//   };

//   return (
//     <FromTemplate
//       onSubmit={onSubmit}
//       title="ورود"
//       submitText="ورود"
//       formContent={
//         <PasswordInput
//           label="رمز عبور"
//           placeholder="رمز عبور حساب کاربری خود را وارد کنید"
//           onChange={setPassword}
//         />
//       }
//       formAction={
//         <Button
//           onClick={() => phoneAuth({ phone_number: auth_data.phone_number })}>
//           ورود با کد فعال‌سازی
//         </Button>
//       }
//     />
//   );
// }

// const mapStateToProps = (state) => ({
//   auth_data: state.account.auth_data,
// });

// export default connect(mapStateToProps, { loginByPhonePassword, phoneAuth })(
//   EmailAndPassword
// );
