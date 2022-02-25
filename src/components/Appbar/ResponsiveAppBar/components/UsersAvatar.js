import {
  Avatar,
  Badge,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
  Box,
} from '@material-ui/core';
import { MapTwoTone, OfflineBolt } from '@material-ui/icons';
import { AvatarGroup } from '@material-ui/lab';
import React, { useContext } from 'react';

import { StatePageContext } from '../../../../containers/Workshop';
import { stringToColor } from '../../../../utils/stringToColor';

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

  console.log(myTeam)

  return (
    <>
      <Tooltip
        onClick={handleClick}
        arrow
        title={`تیم ${myTeam?.name}`}>
        <Avatar
          style={{
            backgroundColor: stringToColor(`تیم ${myTeam?.name}`),
            border: '0.1px solid lightgray',
          }}>
          {myTeam?.name[0]}
        </Avatar>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          {`تیم ${myTeam?.name}`}
        </MenuItem>

        {myTeam?.members?.map((member) =>
          <MenuItem key={member.id}>
            <Badge
              key={member.id}
              overlap="circle"
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
                {`${member.first_name[0]}`}
              </Avatar>
            </Badge>
            <Box ml={1}>
              {`${member?.first_name} ${member?.last_name}`}
            </Box>
          </MenuItem>

        )}
      </Menu>
    </>
  );
};

export default UsersAvatar;
