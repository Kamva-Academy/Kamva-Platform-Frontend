import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { Fab, makeStyles, Toolbar } from '@material-ui/core';
import {
  getCurrentWorkshop,
  initCurrentWorkshop,
  startWorkshop,
} from '../redux/actions/currentWorkshop';
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
  workshop,
  fsmId,
  stateId,
  playerUUID,
  isMentor,
  startWorkshop,
  initCurrentWorkshop,
  getCurrentWorkshop,
}) => {
  const classes = useStyles();

  const history = useHistory();

  useEffect(() => {
    initCurrentWorkshop();
  }, [initCurrentWorkshop]);

  useEffect(() => {
    if (isMentor) {
      if (!playerUUID) {
        history.push('/');
      } else {
        getCurrentWorkshop({ fsmId, playerUUID });
      }
    } else {
      getCurrentWorkshop({ fsmId });
    }
  }, [
    fsmId,
    playerUUID,
    isMentor,
    getCurrentWorkshop,
    initCurrentWorkshop,
    startWorkshop,
    history,
  ]);

  useEffect(() => {
    if (!playerUUID && !isMentor) {
      startWorkshop({ fsm: fsmId });
    }
  }, [playerUUID, isMentor, fsmId, startWorkshop]);

  const { states = [] } = workshop;

  return (
    <StatePageContext.Provider value={{ fsmId, stateId, playerUUID, isMentor }}>
      <Container component="main" className={classes.body}>
        <ResponsiveAppBar mode="WORKSHOP" />
        <Toolbar id="back-to-top-anchor" />
        {states && stateId === 'start' ? (
          <StatePage state={states.find((state) => state.name === 'شروع')} />
        ) : (
          <StatePage state={states.find((state) => +state.id === +stateId)} />
        )}
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
  workshop: state.currentWorkshop.workshop,
  isMentor: state.account.user.is_mentor,
  fsmId: ownProps.match.params.fsmId,
  stateId: ownProps.match.params.stateId,
  playerUUID: state.account.user.is_mentor
    ? ownProps.match.params.playerUUID
    : state.currentWorkshop.player.uuid,
});

export default connect(mapStateToProps, {
  getCurrentWorkshop,
  initCurrentWorkshop,
  startWorkshop,
})(Workshop);
