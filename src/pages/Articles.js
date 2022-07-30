import { makeStyles } from '@mui/styles';
import { Grid, Typography } from '@mui/material';

import Pagination from '@mui/material/Pagination';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import ArticleCard from '../components/Cards/ArticleCard';
import { getAllArticlesAction } from '../redux/slices/article';
import Layout from '../containers/Layout';

const useStyles = makeStyles((theme) => ({
}));

const Articles = ({
  getAllArticles,
  articles,
  articlesCount,
}) => {
  const classes = useStyles();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getAllArticles({ pageNumber });
  }, [pageNumber]);

  return (
    <Layout>
      <Grid container spacing={4} justify='center'>
        <Grid item xs={12}>
          <Typography variant="h1" align='center'>
            {'مقاله‌ها'}
          </Typography>
        </Grid>
        <Grid item container spacing={2} xs={12}>
          {articles?.map((article, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <ArticleCard {...article} />
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <Pagination
            variant="outlined"
            color="primary"
            shape='rounded'
            count={Math.ceil(articlesCount / 12)}
            page={pageNumber}
            onChange={(e, value) => setPageNumber(value)}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
    articles: state.article.articles,
    articlesCount: state.article.articlesCount,
});

export default connect(mapStateToProps, {
  getAllArticles: getAllArticlesAction,
})(Articles);
