import { Grid, makeStyles, Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { Telegram as TelegramIcon } from '@material-ui/icons';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import ArticleCard2 from '../components/Cards/ArticleCard2';
import Widget from '../components/Widget';
import { getArticle } from '../redux/actions/mentor';
import { articleData } from './PhysicsDay';

const useStyles = makeStyles((theme) => ({
  tabbar: {
    overflow: 'hidden',
  },
  body: {
    background: '#fff',
    paddingTop: theme.spacing(1),
    height: '100vh',
  },
  smFullHeight: {
    [theme.breakpoints.up('sm')]: {
      height: '100%',
    },
  },
  mainPaper: {
    padding: theme.spacing(1),
    background: '#F7F9FC',
  },
  workshopTabsPaper: {
    padding: theme.spacing(1),
    background: '#F7F9FC',
    height: '100%',
  },
}));

const Article = ({ article = {}, articleId, getArticle }) => {
  const history = useHistory();

  const { widgets = [] } = article;
  widgets.sort((a, b) => a.id - b.id);

  useEffect(() => {
    if (articleId) {
      getArticle({ id: articleId });
    } else {
      history.push('/');
    }
  }, [getArticle, articleId, history]);

  const classes = useStyles();

  return (
    <Container component="main" className={classes.body}>
      <ResponsiveAppBar mode="ARTICLE" />
      {article && (
        <Grid
          container
          justify="center"
          direction="row-reverse"
          spacing={2}
          style={{ marginTop: 70 }}>
          <Grid item xs={12} md={4}>
            <ArticleCard2 {...articleData[articleId]} withoutButton />
            {/* <Grid container>
              <Grid item>
                <TelegramIcon />
              </Grid>
              <Grid item></Grid>
              <Grid item></Grid>
              <Grid item></Grid>
            </Grid> */}
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper className={classes.mainPaper}>
              {widgets.map((widget) => (
                <Widget key={widget.id} widget={widget} />
              ))}
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => ({
  article: state.mentor.articles.find(
    (article) => +article.id === +ownProps.match.params.articleId
  ),
  articleId: ownProps.match.params.articleId,
});

export default connect(mapStateToProps, { getArticle })(Article);
