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
  ButtonGroup,
  Avatar,
} from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  icon: {
    textAlign: 'center',
  },
});

const TeamCard = ({ name, teamMembers, }) => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} sm={6} md={4} justify='center'>
      <Card className={classes.root}>
        <CardActionArea disabled>
          <CardContent>
            <Typography gutterBottom variant="h5">
              {' تیم'}
            </Typography>
            <Typography gutterBottom variant="h3">
              {name}
            </Typography>
            <Grid container direction='row' justify='center'>
              <Avatar className={classes.orange}>N</Avatar>
              <Avatar className={classes.orange}>N</Avatar>
              <Avatar className={classes.orange}>N</Avatar>
            </Grid>
          </CardContent>
          <Grid container>
          </Grid>
        </CardActionArea>
        <CardActions>
          <ButtonGroup variant='outlined' color="primary" fullWidth>
            <Button>
              مشاهده
            </Button>
            <Button>
              سابقه
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TeamCard;