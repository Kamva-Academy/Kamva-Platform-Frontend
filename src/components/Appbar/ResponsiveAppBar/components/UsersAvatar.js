import { Avatar, Tooltip } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import React, { useContext } from 'react';

import { StatePageContext } from '../../../../containers/Workshop';
import { stringToColor } from '../../../../utils/stringToColor';

const UsersAvatar = () => {
  const { myTeam } = useContext(StatePageContext);
  return (
    <AvatarGroup max={4}>
      {myTeam?.members?.map(member => (
        <Tooltip key={member.id} arrow
          title={`${member.first_name} ${member.last_name}` +
            (myTeam?.team_head
              ? ' (سرگروه)'
              : '')
          }>
          <Avatar style={{ backgroundColor: stringToColor(`${member.first_name} ${member.last_name}`) }}>
            {`${member.first_name[0]}`}
          </Avatar>
        </Tooltip>
      ))}
    </AvatarGroup>
  );
};

export default UsersAvatar;
