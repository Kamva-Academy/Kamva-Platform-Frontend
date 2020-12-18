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
          name="نظریه بازی‌ها"
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
          name="بلاکچین"
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
          name="گرانش"
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
          name="هوش مصنوعی"
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
          name="الگوریتم"
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
          name="نظریه کدگذاری"
        />
      </Grid>
    </Grid>
  );
}

export default WorkshopList;
