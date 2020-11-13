import React from 'react';
import {
  Button,
  makeStyles,
  Grid,
  Typography,
  CardContent,
  CardActionArea,
  Card,
  CardMedia,
  CardActions,
  Chip,
} from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import toPersianNumber from '../../utils/translateNumber'

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

const WorkShopCard = ({ name, description, teamsNumber, mentorsNumber }) => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} sm={6} md={4} justify='center'>
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
                label={`${mentorsNumber = 6} منتور`}
              />
            </Grid>
            <Grid container item xs={6} justify="center">
              <Chip
                variant="outlined"
                icon={<PeopleAltIcon />}
                label={`${teamsNumber = 3} تیم`}
              />
            </Grid>
          </Grid>
        </CardActionArea>
        <CardActions>
          <Button variant="outlined" fullWidth color="primary">
            مشاهده
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default WorkShopCard;
