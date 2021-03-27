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
  withWidth,
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
  width,
}) {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 30 });

  const {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  } = modes[mode]();

  const rightItems = width === 'xs' ? mobileRightItems : desktopRightItems;
  const leftItems = width === 'xs' ? mobileLeftItems : desktopLeftItems;

  return (
    <>
      <HideOnScroll disable={!hideOnScroll}>
        <AppBar
          id="appBar"
          className={clsx(
            classes.appBar,
            showBackOnScroll && !trigger && classes.hideBack
          )}
          color="inherit">
          <Container>
            <Toolbar className={classes.toolbar} disableGutters>
              {mobileMenuListItems.length > 0 && (
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  className={classes.menuButton}
                  onClick={() => setDrawerOpen(true)}>
                  <MenuIcon />
                </IconButton>
              )}
              <Grid container justify="space-between">
                <Grid item>
                  <Grid
                    spacing={1}
                    container
                    justify="flex-start"
                    alignItems="center">
                    {rightItems.map((item, index) => (
                      <Grid key={index} item>
                        {item}
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid
                    spacing={1}
                    container
                    justify="flex-end"
                    alignItems="center">
                    {leftItems.map((item, index) => (
                      <Grid key={index} item>
                        {item}
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
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
                  <ListItem key={index}>{item}</ListItem>
                ))}
              </List>
            </div>
          </Drawer>
        </Hidden>
      )}
    </>
  );
}

export default withWidth()(ResponsiveAppBar);
