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

const useStyles = makeStyles((theme) => ({
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

function WorkshopList() {
  const t = useTranslate();

  return (
    <Grid container spacing={1} alignItems="center" justify="center">
      <Grid
        container
        alignItems="center"
        justify="center"
        item
        xs={6}
        sm={4}
        md={3}
        lg={2}>
        <WorkshopCard
          img={process.env.PUBLIC_URL + '/game_theory.jpg'}
          name={t('gameTheory')}
        />
      </Grid>
      <Grid
        container
        alignItems="center"
        justify="center"
        item
        xs={6}
        sm={4}
        md={3}
        lg={2}>
        <WorkshopCard
          img={process.env.PUBLIC_URL + '/blockchain.jpg'}
          name={t('blockchain')}
        />
      </Grid>
      <Grid
        container
        alignItems="center"
        justify="center"
        item
        xs={6}
        sm={4}
        md={3}
        lg={2}>
        <WorkshopCard
          img={process.env.PUBLIC_URL + '/granesh.jpg'}
          name={t('gravity')}
        />
      </Grid>
      <Grid
        container
        alignItems="center"
        justify="center"
        item
        xs={6}
        sm={4}
        md={3}
        lg={2}>
        <WorkshopCard
          img={process.env.PUBLIC_URL + '/ai_pic.jpg'}
          name={t('AI')}
        />
      </Grid>
      <Grid
        container
        alignItems="center"
        justify="center"
        item
        xs={6}
        sm={4}
        md={3}
        lg={2}>
        <WorkshopCard
          img={process.env.PUBLIC_URL + '/algo.jpg'}
          name={t('algorithm')}
        />
      </Grid>
      <Grid
        container
        alignItems="center"
        justify="center"
        item
        xs={6}
        sm={4}
        md={3}
        lg={2}>
        <WorkshopCard
          img={process.env.PUBLIC_URL + '/coding.jpg'}
          name={t('codingTheory')}
        />
      </Grid>
    </Grid>
  );
}

export default WorkshopList;
