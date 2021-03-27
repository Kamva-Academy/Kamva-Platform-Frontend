import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Lock, LockOpen } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { baseURL } from '../../../axios';
import { startWorkshopAction } from '../../../redux/slices/currentState';
import PasswordDialog from './PasswordDialog';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 230,
  },
  media: {
    height: 140,
  },
  header: {
    padding: theme.spacing(0.3, 1, 0),
    background: '#eee',
  },
}));

export const WorkshopCard = ({ workshop, isLoading, startWorkshop }) => {
  const classes = useStyles();

  const [openPassword, setOpenPassword] = useState(false);

  return (
    <Card className={classes.card}>
      <CardActionArea disabled>
        {isLoading ? (
          <>
            <Skeleton animation="wave" height={10} width="80%" />
            <Skeleton
              animation="wave"
              variant="rect"
              className={classes.media}
            />
          </>
        ) : (
          <>
            <CardHeader
              avatar={workshop.has_lock ? <Lock /> : <LockOpen />}
              className={classes.header}
              title="تیمی"
            />
            {workshop.cover_page && (
              <CardMedia
                className={classes.media}
                image={baseURL + workshop.cover_page}
                title={workshop.name}
              />
            )}
          </>
        )}
        <CardContent className={classes.justify}>
          {isLoading ? (
            <>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </>
          ) : (
            <>
              <Typography gutterBottom variant="h4" component="h2">
                {workshop.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {workshop.description}
              </Typography>
            </>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {!isLoading &&
          (workshop.has_started ? (
            <Button
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              component={Link}
              to={`/workshop/${workshop.id}`}>
              بزن بریم!
            </Button>
          ) : (
            <Button
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              onClick={
                !workshop.has_lock
                  ? () => setOpenPassword(true)
                  : () => startWorkshop({ fsmId: workshop.id })
              }>
              بزن بریم!
            </Button>
          ))}
      </CardActions>
      <PasswordDialog
        open={openPassword}
        handleClose={() => setOpenPassword(false)}
        fsmId={workshop?.id}
        startWorkshop={startWorkshop}
      />
    </Card>
  );
};

export default connect(null, { startWorkshop: startWorkshopAction })(
  WorkshopCard
);
