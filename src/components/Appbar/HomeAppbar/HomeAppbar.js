import React, { useState } from 'react';
import {
  AppBar,
  makeStyles,
  Toolbar,
  IconButton,
  Container,
  Button,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import clsx from 'clsx';

import { connect } from 'react-redux';
import {
  Menu as MenuIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
} from '@material-ui/icons';
import HideOnScroll from './HideOnScroll';

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
  signUpColor: {
    color: 'white',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  space: {
    margin: theme.spacing(1),
  },
}));

function HomeAppbar() {
  const classes = useStyles();
  const [drawerOepn, setDrawerOepn] = useState(false);

  return (
    <>
      <HideOnScroll>
        <AppBar className={classes.appBar} color="inherit">
          <Container maxWidth="md">
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                className={classes.menuButton}
                onClick={() => setDrawerOepn(true)}>
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
      </HideOnScroll>
      <Hidden smUp>
        <Drawer
          anchor="left"
          open={drawerOepn}
          onClose={() => setDrawerOepn(false)}>
          <List>
            <ListItem>
              <Button
                variant="contained"
                color="primary"
                className={classes.space}>
                ورود
              </Button>
              <Button
                variant="contained"
                className={clsx(classes.signUpColor, classes.space)}>
                ثبت‌نام
              </Button>
            </ListItem>
            <ListItem button>
              <ListItemText primary={'خروج'} />
            </ListItem>
          </List>
        </Drawer>
      </Hidden>
    </>
  );
}

export default connect()(HomeAppbar);
