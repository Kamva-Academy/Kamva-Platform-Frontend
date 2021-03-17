import { Avatar, Button, IconButton, makeStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { stringToColor } from '../../../../utils/stringToColor';

const useStyles = makeStyles(() => ({
  avatar: {

  }
}));

function AvatarComponent({ name = "علی" }) {
  const classes = useStyles();
  return (
    <Avatar
      // src={process.env.PUBLIC_URL + '/logo.png'}
      style={{ backgroundColor: stringToColor(name) }}
      alt="logo"
      className={classes.avatar}
    >
      {name[0]}
    </Avatar>
  );
}

const mapStateToProps = (state, ownProps) => ({
  name: state.account.user.name,
})

export default connect(
  mapStateToProps,
  {}
)(AvatarComponent);