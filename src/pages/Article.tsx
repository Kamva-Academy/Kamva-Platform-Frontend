import { Box, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import Layout from '../containers/Layout';
import { WidgetModes } from '../components/Widget';
import Widget from '../components/Widget';
import { getArticleAction } from '../redux/slices/article';

const Article = ({ article, getArticle }) => {
  const { articleId } = useParams();

  useEffect(() => {
    getArticle({ articleId });
  }, []);

  return (
    <Layout appbarMode='ARTICLE'>
      <Stack spacing={2} maxWidth='sm'>
        {article?.widgets.map((widget) => (
          <Box key={widget.id}>
            <Widget stateId={article.id} mode={WidgetModes.View} coveredWithPaper={false} widget={widget} />
          </Box>
        ))}
      </Stack>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  article: state.article.article,
});

export default connect(mapStateToProps, {
  getArticle: getArticleAction
})(Article);
