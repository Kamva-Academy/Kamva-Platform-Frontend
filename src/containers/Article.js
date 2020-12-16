import { Grid, makeStyles, Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import Widget from '../components/Widget';
import { getArticle } from '../redux/actions/mentor';

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

const Article = ({ article = { widgets: [] }, articleId, getArticle }) => {
  const history = useHistory();

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
      {article && (
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} md={8}>
            <Paper className={classes.mainPaper}>
              {article.widgets.map((widget) => (
                <Widget key={widget.id} widget={widget} />
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.mainPaper}>
              
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
