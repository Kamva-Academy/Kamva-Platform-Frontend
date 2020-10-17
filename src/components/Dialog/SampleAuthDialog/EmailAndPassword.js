// import React, { useState } from 'react';
// import { Box, Button } from '@material-ui/core';
// import FromTemplate from './pageTemplate/FormTemplate';
// import * as pages from './pages';
// import EmailInput from './components/EmailInput';
// import PasswordInput from './components/PasswordInput';
// import { loginByEmailPassword } from '../../../redux/actions/account';
// import { connect } from 'react-redux';

// function EmailAndPassword({ setCurrentPage, loginByEmailPassword }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const onSubmit = () => {
//     loginByEmailPassword({ email, password });
//   };

//   return (
//     <FromTemplate
//       onSubmit={onSubmit}
//       title="ورود"
//       submitText="ورود"
//       formContent={
//         <>
//           <Box my={1}>
//             <EmailInput
//               autoFocus
//               onChange={setEmail}
//               label="آدرس ایمیل"
//               placeholder="ایمیل خود را وارد کنید"
//             />
//           </Box>
//           <Box my={1}>
//             <PasswordInput
//               label="رمز عبور"
//               placeholder="رمز عبور حساب کاربری خود را وارد کنید"
//               onChange={setPassword}
//             />
//           </Box>
//         </>
//       }
//       formAction={
//         <Button onClick={() => setCurrentPage(pages.PHONE)}>
//           ورود با شماره موبایل
//         </Button>
//       }
//     />
//   );
// }

// const mapStateToProps = (state) => ({
//   auth_data: state.account.auth_data,
// });

// export default connect(mapStateToProps, { loginByEmailPassword })(
//   EmailAndPassword
// );
