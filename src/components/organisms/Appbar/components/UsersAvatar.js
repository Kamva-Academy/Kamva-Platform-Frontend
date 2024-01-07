import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { OfflineBolt } from '@mui/icons-material';
import React, { Fragment, useContext } from 'react';

import { StatePageContext } from 'pages/FSM';
import { stringToColor } from 'utils/stringToColor';

const UsersAvatar = () => {
  const { myTeam } = useContext(StatePageContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Tooltip
        components={Button}
        onClick={handleClick}
        arrow
        title={`گروه ${myTeam?.name}`}>
        <IconButton sx={{ padding: 0 }}>
          <Avatar
            sx={{
              backgroundColor: stringToColor(`گروه ${myTeam?.name}`),
              border: '0.1px solid lightgray',
            }}>
            {myTeam?.name.trim()[0]}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu disableScrollLock
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}>
        <MenuItem>
          {`گروه ${myTeam?.name ? myTeam?.name : '؟'}`}
        </MenuItem>
        {myTeam?.members?.map((member) =>
          <MenuItem key={member.id}>
            <Badge
              key={member.id}
              overlap="circular"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              invisible={myTeam?.team_head !== member.id}
              badgeContent={<OfflineBolt style={{ color: 'gold' }} />}>
              <Avatar
                style={{
                  backgroundColor: stringToColor(
                    `${member.first_name} ${member.last_name}`
                  ),
                  border: '0.1px solid lightgray',
                }}>
                {`${member.first_name ? member.first_name[0] : '؟'}`}
              </Avatar>
            </Badge>
            <Box ml={1}>
              {`${member.first_name ? member.first_name : 'بی‌نام'} ${member.last_name ? member.last_name : 'بی‌نام‌زاده'}`}
            </Box>
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

export default UsersAvatar;
