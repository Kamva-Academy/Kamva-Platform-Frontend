import {
  AppBar,
  Container,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Toolbar,
  useScrollTrigger,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react';

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
    transition: '0.2s',
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
  list: {
    width: 250,
  },
  hideBack: {
    background: 'transparent',
    boxShadow: 'none',
    paddingTop: theme.spacing(4),
  },
}));

function ResponsiveAppBar({
  mode = 'LANDING',
  showBackOnScroll = false,
  hideOnScroll = false,
}) {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 30 });

  console.log(mode);

  const {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  } = modes[mode]();

  return (
    <>
      <HideOnScroll disable={!hideOnScroll}>
        <AppBar
          id='appBar'
          className={clsx(
            classes.appBar,
            showBackOnScroll && !trigger && classes.hideBack
          )}
          color="inherit">
          <Container >
            <Toolbar className={classes.toolbar} disableGutters>

              {mobileMenuListItems.length > 0 &&
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  className={classes.menuButton}
                  onClick={() => setDrawerOpen(true)}>
                  <MenuIcon />
                </IconButton>
              }

              <Hidden xsDown>
                <Grid spacing={1} container justify='flex-start' alignItems='center'>
                  {desktopRightItems.map((item, index) => {
                    return (
                      <Grid key={index} item>
                        {item}
                      </Grid>
                    )
                  })}
                </Grid>
              </Hidden>

              <Hidden smUp>
                <Grid spacing={1} container justify='flex-start' alignItems='center'>
                  {mobileRightItems.map((item, index) => {
                    return (
                      <Grid key={index} item>
                        {item}
                      </Grid>
                    )
                  })}
                </Grid>
              </Hidden>

              <div className={classes.grow} />

              <Hidden xsDown>
                <Grid spacing={1} container justify='flex-end' alignItems='center'>
                  {desktopLeftItems.map((item, index) => {
                    return (
                      <Grid key={index} item>
                        {item}
                      </Grid>
                    )
                  })}
                </Grid>
              </Hidden>

              <Hidden smUp>
                <Grid spacing={1} container justify='flex-end' alignItems='center'>
                  {mobileLeftItems.map((item, index) => {
                    return (
                      <Grid key={index} item>
                        {item}
                      </Grid>
                    )
                  })}
                </Grid>
              </Hidden>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      {mobileMenuListItems.length > 0 && (
        <Hidden smUp>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}>
            <div className={classes.list}>
              <List>
                {mobileMenuListItems.map((item, index) => (
                  <ListItem key={index}>
                    {item}
                  </ListItem>
                ))}
              </List>
            </div>
          </Drawer>
        </Hidden>
      )}
    </>
  );
}

export default ResponsiveAppBar;
