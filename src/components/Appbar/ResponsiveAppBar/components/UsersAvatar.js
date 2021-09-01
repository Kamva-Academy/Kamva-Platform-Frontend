import { Avatar, Badge, Tooltip } from '@material-ui/core';
import { OfflineBolt } from '@material-ui/icons';
import { AvatarGroup } from '@material-ui/lab';
import React, { useContext } from 'react';

import { StatePageContext } from '../../../../containers/Workshop';
import { stringToColor } from '../../../../utils/stringToColor';

const UsersAvatar = () => {
  const { myTeam } = useContext(StatePageContext);


  return (
    <AvatarGroup max={4}>
      {myTeam?.members?.map((member) => (
        <Tooltip
          key={member.id}
          arrow
          title={
            `${member.first_name} ${member.last_name}` +
            ((myTeam?.team_head === member.id && myTeam?.members?.length != 1) ? ' (سرگروه) ' : '')
          }>
          <Badge
            overlap="circle"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            invisible={myTeam?.team_head !== member.id}
            badgeContent={<OfflineBolt style={{ color: 'gold' }} />}>
            <div>
              <Avatar
                style={{
                  backgroundColor: stringToColor(
                    `${member.first_name} ${member.last_name}`
                  ),
                  border: '0.1px solid lightgray',
                }}>
                {`${member.first_name[0]}`}
              </Avatar>
            </div>
          </Badge>
        </Tooltip>
      ))}
    </AvatarGroup>
  );
};

export default UsersAvatar;
