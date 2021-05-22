import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import { logoutAction } from '../../../../redux/slices/account';
import AuthDialog from '../../../Dialog/AuthDialog';

function AuthButton({ isLoggedIn, logout }) {
  const t = useTranslate();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <Button variant="outlined" color="primary" onClick={logout}>
          {t('logout')}
        </Button>
      ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setAuthDialogOpen(true)}>
            ورود به کارگاه بدون منتور
          </Button>
        )}
      <AuthDialog
        open={authDialogOpen}
        handleClose={() => setAuthDialogOpen(false)}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.account.token,
});

export default connect(mapStateToProps, { logout: logoutAction })(AuthButton);
