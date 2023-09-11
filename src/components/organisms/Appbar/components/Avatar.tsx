import { Avatar, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { stringToColor } from 'utils/stringToColor';
import { logoutAction } from 'redux/slices/account';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function AvatarComponent({ name = 'بی‌نام', logout }) {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title={name} arrow>
        <IconButton sx={{ padding: 0, paddingLeft: 1 }} onClick={handleClick}>
          <Avatar
            style={{ backgroundColor: stringToColor(name) }}
            alt="logo">
            {name[0]}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={() => {
          if (eventId) {
            navigate(`/event/${eventId}/profile/personal/`);
          } else {
            navigate('/profile/personal/');
          }
        }}>
          <Stack direction='row' spacing={1} alignItems={'center'}>
            <AccountCircleIcon />
            <Typography>
              {'مشاهده پروفایل'}
            </Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={logout}>
          <Stack direction='row' spacing={1} alignItems={'center'}>
            <LogoutIcon />
            <Typography>
              {'خروج از حساب کاربری'}
            </Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </>
  );
}

const mapStateToProps = (state) => ({
  name: state.account.userAccount?.first_name && state.account.userAccount?.last_name
    ? `${state.account.userAccount?.first_name} ${state.account.userAccount?.last_name}`
    : ''
});

export default connect(mapStateToProps, {
  logout: logoutAction,
})(AvatarComponent);
