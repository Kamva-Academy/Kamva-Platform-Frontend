import { Stack } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import NotificationButton from './NotificationButton';
import Avatar from './Avatar';
import DashboardButton from './DashboardButton';

type UserInfoPropsType = {
  isUserAuthenticated: boolean;
}

function UserInfo({ isUserAuthenticated }: UserInfoPropsType) {

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={1}>
      {isUserAuthenticated ?
        <>
          <NotificationButton notifications={[]} />  {/* todo: set real notifications */}
          <Avatar />
        </> :
        <>
          <DashboardButton variant='outlined' name='ورود' to={'/login/'} onClick={null} />
          <DashboardButton variant='contained' name='عضویت' to={'/create-account/'} onClick={null} />
        </>
      }
    </Stack>
  )
}

const mapStateToProps = (state) => ({
  isUserAuthenticated: Boolean(state.account.token),
});

export default connect(mapStateToProps, {

})(UserInfo);
