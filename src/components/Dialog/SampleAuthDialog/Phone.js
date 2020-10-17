// import React, { useState } from 'react';
// import { Button } from '@material-ui/core';
// import FromTemplate from './pageTemplate/FormTemplate';
// import * as pages from './pages';
// import { checkRegistered } from '../../../redux/actions/account';
// import { connect } from 'react-redux';
// import PhoneInput from './components/PhoneInput';

// function Phone({ setCurrentPage, checkRegistered }) {
//   const [phone_number, setPhoneNumber] = useState('');

//   const onSubmit = () => {
//     checkRegistered({ phone_number });
//   };

//   return (
//     <FromTemplate
//       onSubmit={onSubmit}
//       title="ورود / ثبت‌نام"
//       submitText="ادامه"
//       formContent={
//         <PhoneInput
//           autoFocus
//           name="phone_number"
//           label="شماره موبایل"
//           onChange={setPhoneNumber}
//         />
//       }
//       formAction={
//         <Button onClick={() => setCurrentPage(pages.EMAIL_AND_PASSWORD)}>
//           ورود با ایمیل
//         </Button>
//       }
//     />
//   );
// }

// export default connect(null, { checkRegistered })(Phone);
