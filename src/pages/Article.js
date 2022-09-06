import { Grid, IconButton, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';

import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import Widget from '../components/Widget';
import { getArticleAction } from '../redux/slices/article';


const useStyles = makeStyles((theme) => ({
  tabbar: {
    overflow: 'hidden',
  },
  mainPaper: {
    padding: theme.spacing(1),
    background: '#F7F9FC',
  },
}));

const Article = ({ article, getArticle }) => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    if (articleId) {
      getArticle({ articleId });
    } else {
      navigate('/');
    }
  }, [getArticle, articleId, navigate]);

  if (!article) {
    return (<></>)
  }

  const widgets = [...article.widgets];

  widgets.sort((a, b) => a.id - b.id);

  return (
    <Container maxWidth='lg' component="main">
      <ResponsiveAppBar mode="ARTICLE" />
      {article && (
        <Grid
          container
          justify="center"
          direction="row-reverse"
          spacing={2}
          style={{ marginTop: 70 }}>
          <Grid item xs={12} md={8}>
            <Paper className={classes.mainPaper}>
              <Grid item container spacing={2}>
                {widgets.map((widget) => (
                  <Grid item xs={12} key={widget.id}>
                    <Widget widget={widget} />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => ({
  article: state.article.article,
});

export default connect(mapStateToProps, { getArticle: getArticleAction })(
  Article
);
