import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

import MentorIntroduction from '../Dialog/MentorIntroduction';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
    fontSize: '1rem',
    textDecoration: 'none',
    overflow: 'hidden',
    boxShadow: '0 0 3rem -1rem rgba(0, 0, 0, 0.5)',
    transition: 'transform 0.1s ease-in-out',
    maxWidth: '300px',
    '&:hover': {
      transform: 'translateY(-0.2rem) scale(1.02)',
      boxShadow: '0 0.5em 3rem -1rem rgba(0, 0, 0, 0.5)',
    },
  },
  media: {
    height: '300px',
  },
  icon: {
    textAlign: 'center',
  },
});

const PersonCard = ({ name, position, image, description }) => {
  const classes = useStyles();
  const [isDialogueOpen, setDialogueOpen] = useState(false);

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea disabled>
          <CardMedia
            className={classes.media}
            image={`${process.env.PUBLIC_URL}/Staff/${image}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {position}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => setDialogueOpen(!isDialogueOpen)}>
            او کیست؟!
          </Button>
        </CardActions>
      </Card>
      <MentorIntroduction
        name={name}
        image={image}
        description={description}
        open={isDialogueOpen}
        handleClose={() => {
          setDialogueOpen(!isDialogueOpen);
        }}
      />
    </>
  );
};

export default PersonCard;
