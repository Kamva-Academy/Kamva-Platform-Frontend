import { Grid, makeStyles, Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import EditState from '../components/SpecialComponents/EditWorkshopPage/EditState';
import StatesTabbar from '../components/SpecialComponents/EditWorkshopPage/StatesTabbar';
import { getWorkshop } from '../redux/actions/mentor';

const useStyles = makeStyles((theme) => ({
  tabbar: {
    overflow: 'hidden',
  },
  body: {
    background: '#fff',
    paddingTop: theme.spacing(1),
    height: '100vh',
  },
  smFullHeight: {
    [theme.breakpoints.up('sm')]: {
      height: '100%',
    },
  },
  mainPaper: {
    padding: theme.spacing(1),
    background: '#F7F9FC',
  },
  workshopTabsPaper: {
    padding: theme.spacing(1),
    background: '#F7F9FC',
    height: '100%',
  },
}));

const EditWorkshop = ({ workshop, getWorkshop, fsmId, needUpdate }) => {
  const [tab, setTab] = React.useState(0);

  const history = useHistory();

  useEffect(() => {
    if (fsmId) {
      getWorkshop({ id: fsmId });
    } else {
      history.push('/');
    }
  }, [getWorkshop, fsmId, history]);

  useEffect(() => {
    if (fsmId && needUpdate) {
      getWorkshop({ id: fsmId });
    }
  }, [getWorkshop, fsmId, needUpdate, history]);

  const classes = useStyles();

  return (
    <Container component="main" className={classes.body}>
      <Grid container spacing={1} className={classes.smFullHeight}>
        <Grid item xs={12} sm={2} md={1} className={classes.smFullHeight}>
          <Paper className={classes.workshopTabsPaper}></Paper>
        </Grid>
        <Grid item xs={12} sm={10} md={11}>
          <Paper className={classes.mainPaper}>
            {workshop && (
              <>
                <Paper className={classes.tabbar}>
                  <StatesTabbar
                    value={tab}
                    setValue={setTab}
                    tabs={workshop.states.map((state) => state.name)}
                    fsmId={workshop.id}
                  />
                </Paper>
                <EditState state={workshop.states[tab]} />
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => ({
  workshop: state.mentor.workshops.find(
    (workshop) => +workshop.id === +ownProps.match.params.fsmId
  ),
  needUpdate: state.mentor.needUpdateCurrentWorkshop,
  fsmId: ownProps.match.params.fsmId,
});

export default connect(mapStateToProps, { getWorkshop })(EditWorkshop);
