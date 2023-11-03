import { Box, Stack, Typography } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import { WidgetModes } from '../components/organisms/Widget';
import Widget from '../components/organisms/Widget';
import { getArticleAction } from '../redux/slices/article';
import ArticleLayout from 'components/template/ArticleLayout';

type ArticlePropsType = {
  papers: any[];
  getArticle: any;
}

const Article: FC<ArticlePropsType> = ({ papers, getArticle }) => {
  const { articleId } = useParams();

  const article = papers[articleId];

  useEffect(() => {
    getArticle({ articleId });
  }, []);

  return (
    <ArticleLayout appbarMode='ARTICLE'>
      <Stack spacing={2} maxWidth='sm' sx={{ width: '100%', paddingBottom: 2 }}>
        <Typography
          align="center"
          component="h1"
          variant="h3"
          gutterBottom>
          {article?.name}
        </Typography>
        {article?.widgets.map((widget) => (
          <Box key={widget.id}>
            <Widget paperId={article.id} mode={WidgetModes.View} coveredWithPaper={false} widget={widget} />
          </Box>
        ))}
      </Stack>
    </ArticleLayout>
  );
};

const mapStateToProps = (state) => ({
  papers: state.paper.papers,
});

export default connect(mapStateToProps, {
  getArticle: getArticleAction
})(Article);
