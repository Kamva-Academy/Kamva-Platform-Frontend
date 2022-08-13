import { Avatar, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { connect } from 'react-redux';

import { stringToColor } from '../../../../utils/stringToColor';

function AvatarComponent({ name = 'بی‌نام' }) {
  return (
    <Tooltip title={name} arrow>
      <Avatar
        style={{ backgroundColor: stringToColor(name) }}
        alt="logo">
        {name[0]}
      </Avatar>
    </Tooltip>
  );
}

const mapStateToProps = (state) => ({
  name: state.account.userAccount?.first_name && state.account.userAccount?.last_name
    ? `${state.account.userAccount?.first_name} ${state.account.userAccount?.last_name}`
    : ''
});

export default connect(mapStateToProps)(AvatarComponent);
