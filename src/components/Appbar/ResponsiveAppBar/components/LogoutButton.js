import { Avatar, Button, Icon, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../../../redux/actions/account';
import { stringToColor } from '../../../../utils/stringToColor';

const useStyles = makeStyles(() => ({
  iconImage: {
    maxHeight: '20px',
    width: '100%',
  }
}));


function LogoutButton({ logout }) {
  const classes = useStyles();
  return (
    <Button variant='outlined' onClick={logout} startIcon={
      <Icon>
        <img
          src={`${process.env.PUBLIC_URL}/ZeroJourneyer/IconImages/logout.png`}
          alt="iconImage"
          className={classes.iconImage}
        />
      </Icon>}>
      <Typography variant='caption' >
        {'خروج'}
      </Typography>
    </Button>
  );
}

const mapStateToProps = (state, ownProps) => ({
})

export default connect(
  mapStateToProps,
  {
    logout,
  }
)(LogoutButton);