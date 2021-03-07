import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

const useStyles = makeStyles(() => ({
  card: {
    width: 140,
  },
  media: {
    height: 140,
  },
}));

function WorkshopCard({ img, name }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={img} title={name} />
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function WorkshopList({ workshops }) {
  const t = useTranslate();

  return (
    <Grid container spacing={2} alignItems="center" justify="center">
      {
        workshops.map((workshop, index) => (
          <Grid
            key={index}
            container
            alignItems="center"
            justify="center"
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}>
            <WorkshopCard
              img={process.env.PUBLIC_URL + workshop.image}
              name={workshop.name}
            />
          </Grid>
        ))
      }
    </Grid>
  );
}

export default WorkshopList;
