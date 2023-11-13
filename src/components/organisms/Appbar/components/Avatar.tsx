import { Avatar, IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { stringToColor } from 'utils/stringToColor';
import { logoutAction } from 'redux/slices/account';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type AvatarComponentPropsType = {
  name: string;
  logout: any;
}

function AvatarComponent({ name = 'بی‌نام', logout }: AvatarComponentPropsType) {
  const navigate = useNavigate();
  const { programId } = useParams();
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
      <IconButton onClick={handleClick}>
        <Avatar
          sx={{ backgroundColor: stringToColor(name) }}
          alt="logo">
          {name[0]}
        </Avatar>
      </IconButton>
      <Menu
        disableScrollLock
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <Typography sx={{ padding: 1, paddingX: 2, userSelect: 'none' }} fontWeight={500} fontSize={20}>
          {name || 'بی‌نام بی‌نام‌زاده'}
        </Typography>
        <MenuItem onClick={() => {
          if (programId) {
            navigate(`/program/${programId}/profile/personal/`);
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
  name: state.account.userInfo?.first_name && state.account.userInfo?.last_name
    ? `${state.account.userInfo.first_name} ${state.account.userInfo.last_name}`
    : ''
});

export default connect(mapStateToProps, {
  logout: logoutAction,
})(AvatarComponent);
