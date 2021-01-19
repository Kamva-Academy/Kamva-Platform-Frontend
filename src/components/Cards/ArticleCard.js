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
    maxWidth: 300,
  },
  media: {
    height: 150,
  },
  icon: {
    textAlign: 'center',
  },
});

const ArticleCard = ({ id, name = '', description = '' }) => {
  const t = useTranslate();
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea disabled>
        <CardMedia
          className={classes.media}
          image={process.env.PUBLIC_URL + '/ai.jpg'}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="outlined"
          fullWidth
          color="primary"
          component={Link}
          to={`/edit_article/${id}`}>
          {t('edit')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
