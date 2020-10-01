import React from 'react';
import {
  AppBar,
  makeStyles,
  Toolbar,
  IconButton,
  Container,
  Button,
  Hidden,
} from '@material-ui/core';

import { connect } from 'react-redux';
import { Menu as MenuIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: 5,
    color: theme.palette.primary.main,
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
  },
  grow: {
    flexGrow: 1,
  },
  logo: { maxWidth: 45 },
  logoButton: { padding: 0 },
}));

function HomeAppbar() {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} color="inherit">
      <Container maxWidth="md">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Hidden xsDown>
            <Button className={classes.logoButton}>
              <img
                src={process.env.PUBLIC_URL + '/logo.png'}
                alt="logo"
                className={classes.logo}
              />
            </Button>
          </Hidden>
          <div className={classes.grow} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default connect()(HomeAppbar);
