import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import {makeStyles} from '@mui/styles'
import React from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link, useParams } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 150,
  },
  icon: {
    textAlign: 'center',
  },
});

const WorkshopCard = ({
  id,
  name,
  cover_page,
  description,
  teamsNumber = 0,
  mentorsNumber = 0,
}) => {
  const classes = useStyles();
  const t = useTranslate();
  const { eventId } = useParams();

  return (
    <Card className={classes.root}>
      <CardActionArea disabled>
        {cover_page &&
          <CardMedia
            className={classes.media}
            image={cover_page}
            title={name}
          />
        }
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        {/* <Grid container direction="row" justify="center">
          <Grid container item xs={6} justify="center">
            <Chip
              variant="outlined"
              icon={<EmojiPeopleIcon />}
              label={`${mentorsNumber} ${t('mentor')}`}
            />
          </Grid>
          <Grid container item xs={6} justify="center">
            <Chip
              variant="outlined"
              icon={<PeopleAltIcon />}
              label={`${teamsNumber} ${t('team')}`}
            />
          </Grid>
        </Grid> */}
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained" fullWidth color="primary"
          component={Link} to={`/event/${eventId}/workshop/${id}`}>
          {'ورود'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default WorkshopCard;
