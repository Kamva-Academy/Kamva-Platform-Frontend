import React, { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

import AppBar from 'components/organisms/Appbar';
import { AppbarModes } from 'types/global';

type LayoutPropsType = {
  appbarMode: AppbarModes;
  children: any;
}

const Layout: FC<LayoutPropsType> = ({
  appbarMode = 'DASHBOARD',
  children,
}) => {
  const { programId } = useParams();
  const { fsmId } = useParams();

  return (
    <Fragment>
      <AppBar mode={appbarMode} position="relative" />
      <Container maxWidth='lg'
        sx={{
          display: 'flex',
          marginTop: 4,
          marginBottom: 2,
          justifyContent: 'center',
          marginRight: 'auto !important',
          marginLeft: 'auto !important',
        }}>
        {children}
      </Container>
    </Fragment>
  );
};


export default Layout;
