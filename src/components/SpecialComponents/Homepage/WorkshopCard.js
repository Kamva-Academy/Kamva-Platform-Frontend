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

import CardDialogue from './CardDialogue'

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: '18rem',
    fontSize: '1rem',
    textDecoration: 'none',
    overflow: 'hidden',
    boxShadow: '0 0 3rem -1rem rgba(0, 0, 0, 0.5)',
    transition: 'transform 0.1s ease-in-out',
    '&:hover': {
      transform: 'translateY(-0.2rem) scale(1.02)',
      boxShadow: '0 0.5em 3rem -1rem rgba(0, 0, 0, 0.5)',
    }
  },
  media: {
    height: '280px',
  },
  icon: {
    textAlign: 'center',
  },
});

const WorkshopCard = ({
  name,
  position,
  image,
  description,
}) => {
  const classes = useStyles();
  const [isDialogueOpen, setDialogueOpen] = useState(false);

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea disabled>
          <CardMedia
            className={classes.media}
            image={`${process.env.PUBLIC_URL}${image}`}
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
          <Button fullWidth variant='contained' color='secondary' onClick={() => setDialogueOpen(!isDialogueOpen)}>
            بیشتر برامون بگو!
          </Button>
        </CardActions>
      </Card>
      <CardDialogue
        name={name}
        image={image}
        description={description}
        open={isDialogueOpen}
        handleClose={() => { setDialogueOpen(!isDialogueOpen) }}
      />
    </>
  );
};

export default WorkshopCard;
