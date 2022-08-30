import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import AreYouSure from '../../components/Dialog/AreYouSure'
import { removeFromTeamAction } from '../../redux/slices/events';

import {
  makeTeamHeadAction,
  deleteTeamAction,
  updateTeamChatRoomLinkAction,
} from '../../redux/slices/events';

type TeamMemberPropsType = {
  memberId: number;
  firstName: string;
  lastName: string;
  teamId: string;
  teamHead: number;
  username: string;

  makeTeamHead: any;
  removeFromTeam: any;
}

const TeamMember: FC<TeamMemberPropsType> = ({
  memberId,
  firstName,
  lastName,
  teamId,
  teamHead,
  username,

  makeTeamHead,
  removeFromTeam,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [removeTeamMemberDialog, setRemoveTeamMemberDialog] = useState(false)

  const submitRemoveFromTeam = () => {
    removeFromTeam({ receipt: memberId })
  }

  return (
    <>
      <Stack direction='row' key={memberId} alignItems='start' justifyContent='space-between'>
        <FormControlLabel
          control={
            <Checkbox
              checked={teamHead == memberId}
              onClick={() => {
                makeTeamHead({ receipt: memberId, teamId })
              }}
              color="primary" />
          }
          label={`${firstName} ${lastName}` === ' ' ? 'بی‌نام!' : `${firstName} ${lastName} (${username})`}
          labelPlacement="end"
        />
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}>
          <MenuItem onClick={() => {
            setRemoveTeamMemberDialog(true);
            handleClose();
          }}>{'حذف از تیم'}</MenuItem>
        </Menu>
      </Stack>

      <AreYouSure
        open={removeTeamMemberDialog}
        handleClose={() => setRemoveTeamMemberDialog(false)}
        callBackFunction={submitRemoveFromTeam}
      />
    </>
  );
};


export default connect(null, {
  removeFromTeam: removeFromTeamAction,
  makeTeamHead: makeTeamHeadAction,
})(TeamMember);
