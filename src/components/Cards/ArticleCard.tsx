import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { FC, useState } from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link } from 'react-router-dom';

import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import { ArticleType } from '../../types/redux/article';


const ArticleCard: FC<ArticleType> = ({ id, name = '', description = '', cover_page = '' }) => {
  const t = useTranslate();

  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'space-between',
      // maxWidth: 300,
    }}>
      <Box>
        <Stack
          direction="row"
          sx={{
            padding: "10px",
            background: '#eee',
            height: "40px",
            display: 'flex',
            justifyContent: "space-between",
            alignItems: 'center'
          }}>
          {/* <Tooltip title='ویرایش' arrow>
            <IconButton component={Link} to={`/edit-article/${id}`} >
              <ModeEditTwoToneIcon />
            </IconButton>
          </Tooltip> */}
        </Stack>
        <CardMedia
          sx={{ height: 200 }}
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
      </Box>
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
