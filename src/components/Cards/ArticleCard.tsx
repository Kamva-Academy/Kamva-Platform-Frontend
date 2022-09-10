import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
  } from '@mui/material';
  import { makeStyles } from '@mui/styles';
  import React, { FC, useState } from 'react';
  import { useTranslate } from 'react-redux-multilingual/lib/context';
  import { Link } from 'react-router-dom';

  import { ArticleType } from '../../types/redux/article';
  
  const useStyles = makeStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      // maxWidth: 300,
    },
    media: {
      height: 200,
    },
    icon: {
      textAlign: 'center',
    },
  });
  
  const ArticleCard: FC<ArticleType> = ({ id, name = '', description = '', cover_page = '' }) => {
    const t = useTranslate();
    const classes = useStyles();
  
    return (
      <Card className={classes.root}>
        <CardActionArea disabled>
          <CardMedia
            className={classes.media}
            image={cover_page ? cover_page : `${process.env.PUBLIC_URL}/logo.png`}
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
            to={`/article/${id}`}>
            {'مشاهده'}
          </Button>
        </CardActions>
      </Card>
    );
  };
  
  export default ArticleCard;
  