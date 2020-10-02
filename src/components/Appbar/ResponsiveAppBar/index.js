import React, { useState } from 'react';
import {
  AppBar,
  makeStyles,
  Toolbar,
  IconButton,
  Container,
  Hidden,
  Drawer,
  List,
  ListItem,
} from '@material-ui/core';

import { connect } from 'react-redux';
import { Menu as MenuIcon } from '@material-ui/icons';
import HideOnScroll from './components/HideOnScroll';
import modes from './modes';

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
}));

function ResponsiveAppBar({ mode = 'LANDING' }) {
  const classes = useStyles();
  const [drawerOepn, setDrawerOepn] = useState(false);

  const {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  } = modes[mode]();

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
              <Hidden xsDown>{desktopRightItems}</Hidden>
              <Hidden smUp>{mobileRightItems}</Hidden>
              <div className={classes.grow} />
              <Hidden xsDown>{desktopLeftItems}</Hidden>
              <Hidden smUp>{mobileLeftItems}</Hidden>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Hidden smUp>
        <Drawer
          anchor="left"
          open={drawerOepn}
          onClose={() => setDrawerOepn(false)}>
          {mobileMenuListItems.map((item, i) => (
            <List key={i}>
              <ListItem>{item}</ListItem>
            </List>
          ))}
        </Drawer>
      </Hidden>
    </>
  );
}

export default connect()(ResponsiveAppBar);
