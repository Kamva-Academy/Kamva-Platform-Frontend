import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

import AppBar from 'components/organisms/Appbar';
import { AppBarModes } from 'components/organisms/Appbar/useAppbarModes';

const Layout = ({
  appbarMode = AppBarModes.STUDENT_DASHBOARD,
  ...props
}) => {
  const { programId } = useParams();
  const { fsmId } = useParams();

  return (
    <Fragment>
      {fsmId ? <AppBar mode={AppBarModes.FSM} position="relative" /> :
        programId ? <AppBar mode={AppBarModes.PROGRAM} position="relative" />
          : appbarMode ? <AppBar mode={appbarMode} position="relative" />
            : null
      }
      <Container maxWidth='lg'
        sx={{
          display: 'flex',
          marginTop: 4,
          marginBottom: 2,
          justifyContent: 'center',
          marginRight: 'auto !important',
          marginLeft: 'auto !important',
        }}>
        {props.children}
      </Container>
    </Fragment>
  );
};


export default Layout;
