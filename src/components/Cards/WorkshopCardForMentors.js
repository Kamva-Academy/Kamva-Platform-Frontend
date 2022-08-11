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
import { makeStyles } from '@mui/styles'
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
    <Card className={classes.root}
      sx={{
        maxWidth: 300,
        marginTop: '0px',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '100%',
        width: '100%',
        padding: '0px !important',
        backgroundColor: 'rgb(255, 255, 255, 0.94)',
        fontSize: '1rem',
        textDecoration: 'none',
        overflow: 'hidden',
        boxShadow: '0 0 1px 0rem rgba(0, 0, 0, 0.5)',
        transition: 'transform 0.1s ease-in-out',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-0.1rem) scale(1.01)',
          boxShadow: '0 0.5em 1rem -1rem rgba(2, 2, 2, 2.5)',
        },
      }}>
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
