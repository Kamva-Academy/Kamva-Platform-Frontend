import { Box, Grid, Stack, Paper } from '@mui/material';
import Container from '@mui/material/Container';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../containers/Layout';
import { WidgetModes } from '../components/Widget';
import Widget from '../components/Widget';
import { getArticleAction } from '../redux/slices/article';

const Article = ({ article, getArticle }) => {
  const { articleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (articleId) {
      getArticle({ articleId });
    } else {
      navigate('/');
    }
  }, [getArticle, articleId]);

  if (!article) {
    return (<></>)
  }

  const widgets = [...article.widgets];
  widgets.sort((a, b) => a.id - b.id);

  return (
    <Layout appbarMode='ARTICLE'>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 1 }}>
            <Stack spacing={2}>
              {widgets.map((widget) => (
                <Box key={widget.id}>
                  <Widget stateId={article.id} mode={WidgetModes.View} coveredWithPaper={false} widget={widget} />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state, ownProps) => ({
  article: state.article.article,
});

export default connect(mapStateToProps, {
  getArticle: getArticleAction
})(Article);
