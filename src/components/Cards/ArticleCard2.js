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
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  media: {
    height: 140,
  },
});

const ArticleCard2 = ({ id, name = '', description = '', img }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea disabled>
        {img && (
          <CardMedia className={classes.media} image={img} title={name} />
        )}

        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          component={Link}
          disabled={!id}
          to={id && `/article/${id}`}>
          مطالعه مقاله
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleCard2;
