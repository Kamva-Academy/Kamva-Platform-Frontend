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
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import React from 'react';
import { Link } from 'react-router-dom';

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

const WorkShopCard = ({
  id,
  name = '',
  description = '',
  teamsNumber = 0,
  mentorsNumber = 0,
}) => {
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
              label={`${(mentorsNumber = 6)} منتور`}
            />
          </Grid>
          <Grid container item xs={6} justify="center">
            <Chip
              variant="outlined"
              icon={<PeopleAltIcon />}
              label={`${(teamsNumber = 3)} تیم`}
            />
          </Grid>
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

export default WorkShopCard;
