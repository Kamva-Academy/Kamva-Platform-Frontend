import { Grid, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ArticleCard from 'components/organisms/cards/ArticleCard';
import { getAllArticlesAction } from '../redux/slices/article';
import Layout from 'components/template/Layout';

import { ArticleType } from '../types/redux/article';
import { ITEMS_PER_PAGE_NUMBER } from '../configs/Constants';

const Articles: FC<{ getAllArticles: Function; articles: ArticleType[]; articlesCount: number }> = ({
  getAllArticles,
  articles,
  articlesCount,
}) => {
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getAllArticles({ pageNumber });
  }, [pageNumber]);

  return (
    <Layout appbarMode='DASHBOARD'>
      <Grid container spacing={4} justifyContent='center'>
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
            count={Math.ceil(articlesCount / ITEMS_PER_PAGE_NUMBER)}
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
