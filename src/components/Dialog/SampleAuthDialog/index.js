import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Close as CloseIcon } from '@material-ui/icons';
import { Container, IconButton } from '@material-ui/core';
import * as pages from './pages';
import { checkRegistered, phoneAuth } from '../../../redux/actions/account';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  closeIcon: {
    height: 44,
  },
  dialogContent: {
    height: 350,
    [theme.breakpoints.down('xs')]: {
      height: 'auto',
    },
  },
}));

function AuthDialog({ open, handleClose, auth_data, phoneAuth, isLoggedIn }) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [currentPage, setCurrentPage] = useState(pages.PHONE);

  useEffect(() => {
    // switch (currentPage.type) {
    //   case pages.PHONE.type:
    //     if (!!auth_data.phone_number) {
    //       if (!auth_data.registered) {
    //         phoneAuth({ phone_number: auth_data.phone_number });
    //         setCurrentPage(pages.CODE_AND_PASSWORD);
    //       } else {
    //         setCurrentPage(pages.PASSWORD);
    //       }
    //     }
    //     break;
    //   case pages.CODE_AND_PASSWORD.type:
    //     if (isLoggedIn) {
    //       setCurrentPage(pages.NAME_AND_EMAIL);
    //     }
    //     break;
    //   case pages.PASSWORD.type:
    //     if (auth_data.code_sent) {
    //       setCurrentPage(pages.CODE);
    //     }
    //     break;
    //   default:
    //     break;
    // }
  }, [auth_data, currentPage, phoneAuth, setCurrentPage, isLoggedIn]);

  const DialogContentCompenent = currentPage.Component;
  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={handleClose}
      scroll="body">
      <div className={classes.rightSide}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className={classes.closeIcon}>
          <CloseIcon />
        </IconButton>
        <Container className={classes.dialogContent}>
          <DialogContentCompenent setCurrentPage={setCurrentPage} />
        </Container>
      </div>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  auth_data: state.account.auth_data,
  isLoggedIn: !!state.account.token,
});

export default connect(mapStateToProps, { checkRegistered, phoneAuth })(
  AuthDialog
);
