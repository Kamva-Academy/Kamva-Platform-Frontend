import { makeStyles, Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import EditState from '../components/SpecialComponents/EditWorkshopPage/EditState';
import StatesTabbar from '../components/SpecialComponents/EditWorkshopPage/StatesTabbar';
import { getWorkshop } from '../redux/actions/mentor';

const useStyles = makeStyles((theme) => ({
  tabbar: {
    margin: theme.spacing(2, 2, 0),
    overflow: 'hidden',
  },
  body: {
    background: '#fff',
  },
  mainPaper: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1),
    background: '#F7F9FC',
  },
}));

const EditWorkshop = ({ workshop, getWorkshop, fsmId }) => {
  const [tab, setTab] = React.useState(0);

  const history = useHistory();

  useEffect(() => {
    if (fsmId) {
      getWorkshop({ id: fsmId });
    } else {
      history.push('/');
    }
  }, [getWorkshop, fsmId, history]);

  const classes = useStyles();

  return (
    <Container component="main" className={classes.body}>
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
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => ({
  workshop: state.mentor.workshops.find(
    (workshop) => +workshop.id === +ownProps.match.params.fsmId
  ),
  fsmId: ownProps.match.params.fsmId,
});

export default connect(mapStateToProps, { getWorkshop })(EditWorkshop);
