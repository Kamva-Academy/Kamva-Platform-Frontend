import { Grid, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { AddCircle as AddCircleIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import ArticleCard from '../../Cards/ArticleCard';
import CreateArticleDialog from '../../Dialog/CreateArticleDialog/CreateArticleDialog';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    right: theme.spacing(2),
    zIndex: 5,
  },
  cardHolder: {
    padding: theme.spacing(2),
  },
}));

function Articles({ articles }) {
  const classes = useStyles();

  const [openCreateArticleDialog, setOpenCreateArticleDialog] = useState(false);

  return (
    <>
      <Grid container direction="column">
        <Grid item xs={12}>
          <Tooltip
            arrow
            title={'اضافه کردن مقاله جدید'}
            className={classes.absolute}>
            <IconButton onClick={() => setOpenCreateArticleDialog(true)}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid
          container
          item
          spacing={2}
          alignItems="center"
          justify="center"
          direction="row"
          className={classes.cardHolder}>
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <ArticleCard {...article} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <CreateArticleDialog
        open={openCreateArticleDialog}
        handleClose={() => setOpenCreateArticleDialog(false)}
      />
    </>
  );
}
const mapStateToProps = (state) => ({
  articles: state.mentor.articles,
});
export default connect(mapStateToProps)(Articles);
