import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { Fab, makeStyles, Toolbar } from '@material-ui/core';
import {
  getCurrentState,
  initCurrentState,
  startWorkshop,
} from '../redux/actions/currentState';
import { connect } from 'react-redux';
import ScrollTop from '../components/ScrollToTop/ScrollToTop';
import { KeyboardArrowUp as KeyboardArrowUpIcon } from '@material-ui/icons';
import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import StatePage from '../components/SpecialComponents/WorkshopPage/StatePage';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 64px)',
  },
  title: {
    fontSize: 60,
    color: '#555',
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 40,
    },
  },
  body: {
    background: '#F7F9FC',
  },
}));

export const StatePageContext = React.createContext();

const Workshop = ({
  workshopState,
  fsmId,
  stateId,
  playerUUID,
  isMentor,
  startWorkshop,
  initCurrentState,
  getCurrentState,
}) => {
  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    initCurrentState();
  }, [initCurrentState, stateId]);

  useEffect(() => {
    if (isMentor && !playerUUID) {
      history.push('/');
    } else if (playerUUID) {
      getCurrentState({ stateId, playerUUID, isMentor });
    }
  }, [stateId, playerUUID, isMentor, getCurrentState, history]);

  useEffect(() => {
    if (!playerUUID && !isMentor) {
      startWorkshop({ fsmId });
    }
  }, [playerUUID, isMentor, fsmId, startWorkshop]);

  return (
    <StatePageContext.Provider value={{ fsmId, stateId, playerUUID, isMentor }}>
      <Container component="main" className={classes.body}>
        <ResponsiveAppBar mode="WORKSHOP" />
        <Toolbar id="back-to-top-anchor" />
        <StatePage state={workshopState} />
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Container>
    </StatePageContext.Provider>
  );
};

const mapStateToProps = (state, ownProps) => ({
  workshopState: state.currentState.state,
  isMentor: state.account.user.is_mentor,
  fsmId: ownProps.match.params.fsmId,
  stateId: ownProps.match.params.stateId,
  playerUUID: state.account.user.is_mentor
    ? ownProps.match.params.playerUUID
    : state.currentState.player.uuid,
});

export default connect(mapStateToProps, {
  getCurrentState,
  initCurrentState,
  startWorkshop,
})(Workshop);
