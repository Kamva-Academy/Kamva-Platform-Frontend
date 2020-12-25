import { Avatar, Badge, withStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import React from 'react';

import businessmanImage from './styles/businessman_3.svg';
import businesswomanImage from './styles/businesswoman.svg';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 10,
    top: 5,
    border: '1px solid #ccc',
    background: green[500],
    color: 'white',
    [theme.breakpoints.down('xs')]: {
      fontSize: 9,
      padding: 2,
      right: 0,
      top: 0,
    },
  },
}))(Badge);

const StyledAvatar = withStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
}))(Avatar);

function Expert({ expert }) {
  return (
    <StyledBadge badgeContent={expert.score} overlap="circle">
      <StyledAvatar
        src={
          expert.gender === 'MAN' ? businessmanImage : businesswomanImage
        }></StyledAvatar>
    </StyledBadge>
  );
}

export default Expert;
