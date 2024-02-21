import React, { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { Helmet } from "react-helmet";

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

  const { data: party } = useGetPartyQuery();

  if (!party) {
    return null;
  }

  return (
    <Fragment>
      <Helmet>
        <title>{party.main_page_header_data.title}</title>
        <link rel="icon" href={party.logo.mobile_image} />
        <meta name="description" content={party.main_page_header_data.description} />
        <meta name="theme-color" content={party.main_page_header_data.theme_color} />

        <meta property="og:title" content={party.main_page_og_metadata.title} />
        <meta property="og:description" content={party.main_page_og_metadata.description} />
        <meta property="og:type" content={party.main_page_og_metadata.type} />
        <meta property="og:image" content={party.main_page_og_metadata.image} />
        <meta property="og:url" content={party.main_page_og_metadata.url} />
      </Helmet>
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
