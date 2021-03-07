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

import WorkshopCard from './WorkshopCard';

const useStyles = makeStyles(() => ({
  card: {
    width: 140,
  },
  media: {
    height: 140,
  },
}));

function WorkshopList({ workshops }) {
  const t = useTranslate();

  return (
    <Grid container spacing={4} alignItems="center" justify="center">
      {
        workshops.map((workshop, index) => (
          <Grid
            key={index}
            container
            alignItems="center"
            justify="center"
            item
            xs={12}
            sm={6}
            md={4}>
            <WorkshopCard
              image={process.env.PUBLIC_URL + workshop.image}
              name={workshop.name}
              description={workshop.description}
            />
          </Grid>
        ))
      }
    </Grid>
  );
}

export default WorkshopList;
