import {
  AppBar,
  Box,
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
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom';

import {
  getOneEventInfoAction,
} from '../../../redux/slices/events';
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
  isMentor,
  getOneEventInfo,
  workshop,
  event,
  mode = 'WORKSHOP',
  showBackOnScroll = false,
  hideOnScroll = false,
  position = 'fixed',
  width,
}) {
  const { eventId } = useParams();
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 30 });

  useEffect(() => {
    if (eventId) {
      getOneEventInfo({ eventId });
    }
  }, [])

  // useEffect(() => {
  //   if (event?.crispWebsiteId) {
  //     window.$crisp = [];
  //     window.CRISP_WEBSITE_ID = event?.crispWebsiteId;
  //     const d = document;
  //     const s = d.createElement("script");
  //     s.src = "https://client.crisp.chat/l.js";
  //     s.async = 1;
  //     d.getElementsByTagName("head")[0].appendChild(s);
  //   }
  // }, [event?.crispWebsiteId])

  const {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  } = modes[mode]({ workshop, event, isMentor });

  const rightItems = width === 'xs' ? mobileRightItems : desktopRightItems;
  const leftItems = width === 'xs' ? mobileLeftItems : desktopLeftItems;

  return (
    <>
      <HideOnScroll disable={!hideOnScroll}>
        <AppBar
          id='appBar'
          className={clsx(
            classes.appBar,
            showBackOnScroll && !trigger && classes.hideBack
          )}
          position={position}
          color='inherit'>
          <Container>
            <Toolbar className={classes.toolbar} disableGutters>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                  {rightItems.map((item, index) => (
                    <Box mr={1} key={index}>
                      {item}
                    </Box>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {leftItems.map((item, index) => (
                    <Box ml={1} key={index}>
                      {item}
                    </Box>
                  ))}
                </div>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      {mobileMenuListItems.length > 0 && (
        <Hidden smUp>
          <Drawer
            anchor="left" open={drawerOpen}
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

const mapStateToProps = (state) => ({
  isMentor: state.account.userAccount?.is_mentor,
  event: state.events.event,
  workshop: state.workshop.workshop,
})

export default withWidth()(connect(mapStateToProps, {
  getOneEventInfo: getOneEventInfoAction,
})(ResponsiveAppBar));