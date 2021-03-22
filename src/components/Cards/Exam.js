import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    fontSize: '1rem',
    textDecoration: 'none',
    overflow: 'hidden',
    boxShadow: '0 0 3rem -1rem rgba(0, 0, 0, 0.5)',
    transition: 'transform 0.1s ease-in-out',
    maxWidth: '300px',
    '&:hover': {
      transform: 'translateY(-0.5rem) scale(1.0125)',
      boxShadow: '0 0.5em 3rem -1rem rgba(0, 0, 0, 0.5)',
    },
  },
  media: {
    height: '200px',
  },
  icon: {
    textAlign: 'center',
  },
});

const ExamCard = ({ id, name = '', description = '', mentorsNumber = 0 }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea disabled>
        <CardMedia
          className={classes.media}
          image={process.env.PUBLIC_URL + '/ai.jpg'}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        <Grid container direction="row" justify="center">
          <Grid container item xs={6} justify="center">
            <Chip
              variant="outlined"
              icon={<EmojiPeopleIcon />}
              label={`تا حالا ${
                mentorsNumber || 6
              } در این آزمون ثبت‌نام کرده‌اند!`}
            />
          </Grid>
          {/* <Grid container item xs={6} justify="center">
            <Chip
              variant="outlined"
              icon={<PeopleAltIcon />}
              label={`${(teamsNumber = 3)} تیم`}
            />
          </Grid> */}
        </Grid>
      </CardActionArea>
      <CardActions>
        <Button
          variant="outlined"
          fullWidth
          color="primary"
          component={Link}
          to={`/edit_workshop/${id}`}>
          مشاهده
        </Button>
      </CardActions>
    </Card>
  );
};

export default ExamCard;
