import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Stack,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Lock, LockOpen } from '@mui/icons-material';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import { Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

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
      <Box sx={{ alignItems: 'center' }}>
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
            <Stack /* this stack holds the header of each teams card */
              direction="row"
              sx={{
                padding: "10px",
                background: '#eee',
                height: "40px",
                display: 'flex',
                justifyContent: "space-between",
                alignItems: 'center'
              }}
            >
              <Stack direction='row' alignSelf='center' marginTop='7px'>
                <Box marginLeft='5px' marginRight='5px'>{workshop?.has_lock ? <Lock /> : <LockOpen />}</Box>
                <Typography>{workshop?.fsm_p_type == 'Team' ? 'تیمی' : 'فردی'}</Typography>
              </Stack>
              <Box>
                {
                  workshop.is_mentor ?
                    <Tooltip title='ویرایش کارگاه' arrow>
                      <span>
                        <IconButton component={Link} to={`/event/${eventId}/workshop/${workshop?.id}/manage`} >
                          <ModeEditTwoToneIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                    :
                    <Box></Box>
                }
              </Box>
            </Stack>

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
      </Box>
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
