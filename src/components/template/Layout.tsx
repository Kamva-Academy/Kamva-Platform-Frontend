import React, { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

import AppBar from 'components/organisms/Appbar';
import { useGetPartyQuery } from 'redux/features/PartySlice';

type LayoutPropsType = {
  appbarMode: 'DASHBOARD' | 'FSM' | 'MENTOR_FSM' | 'PROGRAM' | 'GENERAL' | 'ARTICLE' | 'None';
  children: any;
}

const Layout: FC<LayoutPropsType> = ({
  appbarMode = 'DASHBOARD',
  children,
}) => {
  const { programId } = useParams();
  const { fsmId } = useParams();

  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPartyQuery();

  if (isLoading && !data) {
    return null;
  }

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
