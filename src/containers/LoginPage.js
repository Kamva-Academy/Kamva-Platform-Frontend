import React from 'react';

import AuthDialog from '../components/Dialog/AuthDialog';

function LoginPage() {
  return <AuthDialog open={true} handleClose={() => { }} />;
}

export default LoginPage;
