import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Lock, LockOpen } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { baseURL } from '../../axios';
import { enterWorkshopAction } from '../../redux/slices/currentState';
import PasswordDialog from '../SpecialComponents/WorkshopsPage/PasswordDialog';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
  },
  media: {
    minHeight: 300,
  },
  header: {
    padding: theme.spacing(0.3, 1, 0),
    background: '#eee',
  },
}));

export const WorkshopCard = ({
  workshop,
  isLoading,
  enterWorkshop,
}) => {
  const classes = useStyles();
  const { eventId } = useParams();
  const [openPassword, setOpenPassword] = useState(false);

  return (
    <Card className={classes.card} elevation={3}>
      <CardActionArea disabled>
        {isLoading ? (
          <>
            <Skeleton
              width='100%'
              animation="wave"
              variant="rectangular"
              className={classes.media}
            />
          </>
        ) : (
          <>
            <CardHeader
              avatar={workshop?.has_lock ? <Lock /> : <LockOpen />}
              className={classes.header}
              title={workshop?.fsm_p_type == 'Team' ? 'تیمی' : 'فردی'}
            />
            {workshop.cover_page && (
              <CardMedia
                className={classes.media}
                image={workshop.cover_page}
                title={workshop.name}
              />
            )}
          </>
        )}
        <CardContent>
          {isLoading ? (
            <>
              <Skeleton
                animation="wave"
                height={10}
                width='100%'
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width='100%' />
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
        {!isLoading && workshop?.is_active &&
          (workshop?.player !== 'NotStarted' ? (
            <Button
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              onClick={
                workshop.has_lock
                  ? () => setOpenPassword(true)
                  : () => enterWorkshop({ fsmId: workshop.id, eventId })
              }>
              بزن بریم!
            </Button>
          ) : (
            <Button
              size="large"
              fullWidth
              variant="contained"
              color="primary"
              onClick={
                workshop.has_lock
                  ? () => setOpenPassword(true)
                  : () => enterWorkshop({ fsmId: workshop.id, eventId })
              }>
              بزن بریم!
            </Button>
          ))}
        {!isLoading && !workshop?.is_active &&
          <Button
            size="large"
            fullWidth
            disabled
            variant="contained"
            color="primary">
            {'غیرفعال'}
          </Button>
        }
      </CardActions>
      <PasswordDialog
        open={openPassword}
        handleClose={() => setOpenPassword(false)}
        fsmId={workshop?.id}
        enterWorkshop={enterWorkshop}
      />
    </Card>
  );
};

export default connect(
  null,
  {
    enterWorkshop: enterWorkshopAction
  }
)(WorkshopCard);
