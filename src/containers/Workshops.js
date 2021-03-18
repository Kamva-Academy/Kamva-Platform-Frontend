import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import { getAllWorkshops } from '../redux/actions/mentor';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 120,
  },
  grid: {
    marginTop: 40,
  },
  card: {
    width: 230,
  },
  media: {
    height: 140,
  },
}));

const WorkshopCard = ({ workshop, isLoading }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea disabled>
        {isLoading ? (
          <Skeleton animation="wave" variant="rect" className={classes.media} />
        ) : (
            workshop.cover_page && (
              <CardMedia
                className={classes.media}
                image={workshop.cover_page}
                title={workshop.name}
              />
            )
          )}
        <CardContent className={classes.justify}>
          {isLoading ? (
            <>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={10} width="80%" />
            </>
          ) : (
              <>
                <Typography gutterBottom variant="h4" component="h2">
                  {workshop.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {workshop.description}
                </Typography>
              </>
            )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {!isLoading && (
          <Button
            size="large"
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to={`/workshop/${workshop.id}`}>
            بزن بریم!
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

function WorkshopGridItems({ workshops, isLoading }) {
  if (isLoading)
    return [...Array(3)].map((e, i) => (
      <Grid item key={i}>
        <WorkshopCard isLoading={true} />
      </Grid>
    ));

  return workshops.map((workshop) => (
    <Grid item key={workshop.id}>
      <WorkshopCard workshop={workshop} />
    </Grid>
  ));
}

function Workshops({ workshops, isLoading, getAllWorkshops }) {
  const classes = useStyles();

  useEffect(() => {
    getAllWorkshops();
  }, []);

  return (
    <>
      <ResponsiveAppBar mode="STUDENT_DASHBOARD" />
      <Container maxWidth="md" className={classes.root}>
        <Typography variant="h1" component="h2">
          کارگاه‌ها
        </Typography>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.grid}
          spacing={3}>
          <WorkshopGridItems workshops={workshops} isLoading={isLoading} />
        </Grid>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  workshops: state.mentor.workshops,
  isLoading: state.mentor.getWorkshopsLoading,
});

export default connect(mapStateToProps, { getAllWorkshops })(Workshops);
