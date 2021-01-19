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
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  media: {
    height: 140,
  },
  justify: {
    textAlign: 'justify',
  },
});

const ArticleCard2 = ({
  id,
  name = '',
  description = '',
  img,
  withoutButton,
}) => {
  const classes = useStyles();
  const t = useTranslate();

  return (
    <Card className={classes.root}>
      <CardActionArea disabled>
        {img && (
          <CardMedia className={classes.media} image={img} title={name} />
        )}
        <CardContent className={classes.justify}>
          <Typography gutterBottom variant="h4" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {!withoutButton && (
          <Button
            variant="contained"
            fullWidth
            color="primary"
            component={Link}
            disabled={!id}
            to={id && `/article/${id}`}>
            {t('readArticle')}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default ArticleCard2;
