import { Grid, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import WorkShopCard from '../../Cards/WorkshopCard';
import CreateWorkshopDialog from '../../Dialog/CreateWorkshopDialog/CreateWorkshopDialog';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    right: theme.spacing(2),
    zIndex: 5,
  },
  cardHolder: {
    padding: theme.spacing(2),
  },
}));

function MentorWorkshops({ workshops }) {
  const classes = useStyles();

  const [openCreateWorkshopDialog, setOpenCreateWorkshopDialog] = useState(
    false
  );

  return (
    <>
      <Grid container direction="column">
        <Grid item xs={12}>
          <Tooltip
            arrow
            title={'اضافه کردن کارگاه جدید'}
            className={classes.absolute}>
            <IconButton onClick={() => setOpenCreateWorkshopDialog(true)}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item spacing={2} direction="row" className={classes.cardHolder}>
          <Grid container spacing={2} alignItems="center" justify="center">
            {workshops.map((workshop) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <WorkShopCard {...workshop} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      <CreateWorkshopDialog
        open={openCreateWorkshopDialog}
        handleClose={() => setOpenCreateWorkshopDialog(false)}
      />
    </>
  );
}
const mapStateToProps = (state) => ({
  workshops: state.mentor.workshops,
});
export default connect(mapStateToProps)(MentorWorkshops);
