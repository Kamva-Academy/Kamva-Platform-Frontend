import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  TextField,
  Box,
  Divider,
  Stack
} from '@mui/material';
import { NotificationsActive } from '@mui/icons-material';
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import validateURL from 'utils/validators/urlValidator'
import AreYouSure from 'components/Dialog/AreYouSure'

import {
  makeTeamHeadAction,
  deleteTeamAction,
  updateTeamChatRoomLinkAction,
} from 'redux/slices/events';
import TeamMember from 'components/atoms/TeamMember';


const useStyles = makeStyles({
  icon: {
    textAlign: 'center',
  },
});

const TeamInfo = ({
  name,
  team_head,
  members,
  teamId,
  playerId,
  makeTeamHead,
  deleteTeam,
  updateTeamChatRoomLink,
  chatRoom,
}) => {
  const classes = useStyles();
  const [teamLink, setTeamLink] = useState(chatRoom)
  const [linkIsValid, setLinkIsValid] = useState(false)
  const [disableRequest, setDisableRequest] = useState(false)
  const [deleteDialogId, setDeleteDialogId] = useState(false)

  useEffect(() => {
    setLinkIsValid(validateURL(teamLink))
  }, [teamLink])

  function updateTeamLink() {
    setDisableRequest(true)
    updateTeamChatRoomLink({ teamId, chat_room: teamLink }).then((response) => {
      setDisableRequest(false);
    })
  }

  return (
    <>
      <Card
        sx={{
          maxWidth: 300,
          margin: '0px auto',
          height: '100%',
          width: '100%',
          padding: '0px !important',
          backgroundColor: 'rgb(255, 255, 255, 0.94)',
          fontSize: '1rem',
          textDecoration: 'none',
          overflow: 'hidden',
          boxShadow: '0 0 1px 0rem rgba(0, 0, 0, 0.5)',
          transition: 'transform 0.1s ease-in-out',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          // '&:hover': {
          //   transform: 'translateY(-0.1rem) scale(1.01)',
          //   boxShadow: '0 0.5em 1rem -1rem rgba(2, 2, 2, 2.5)',
          // },
        }}

      >
        <CardContent>
          {playerId && <NotificationsActive color="primary" />}
          <Typography gutterBottom variant="h3" align="center">
            {name}
          </Typography>
          <Stack spacing={2}>
            {members.length > 0 ? members.map((member) => (
              <Box key={member.id}>
                <TeamMember memberId={member.id}
                  firstName={member.first_name}
                  lastName={member.last_name}
                  teamId={teamId}
                  username={member.username}
                  teamHead={team_head} />
              </Box>
            ))
              :
              <Typography marginLeft='10px' marginTop='20px'>این تیم هیچ عضوی ندارد.</Typography>}
          </Stack>
        </CardContent>
        <CardActions sx={{ alignItems: 'center' }}>
          <Stack alignItems='center' width='100%' margin='0 auto' direction="column" spacing={1}>
            <Box margin='0 auto' width='100%'>
              <Box width='100%' height='10px'></Box>
              <Divider sx={{ width: '100%' }} />
              <Box width='100%' height='10px'></Box>
              <TextField
                error={!linkIsValid && !(teamLink == '' || teamLink == null)}
                helperText={(!linkIsValid && !(teamLink == '' || teamLink == null)) ? ".ورودی وارد شده لینک معتبری نیست" : ' '}
                id="standard-multiline-static"
                label="لینک تیم"
                multiline
                rows={3}
                placeholder="somelink.somedomain"
                variant="outlined"
                value={teamLink || ''}
                onChange={(e) => setTeamLink(e.target.value)}
                sx={{ marginBottom: '10px', marginTop: '10px', width: '100%', direction: 'rtl' }}
              />
              <ButtonGroup sx={{ height: '40px' }} variant="outlined" color="primary" fullWidth>
                <Button disabled={!linkIsValid || teamLink === '' || teamLink === chatRoom || disableRequest} onClick={updateTeamLink}>{'به‌روز‌رسانی'}</Button>
                <Button onClick={() => setDeleteDialogId(true)}>{'حذف'}</Button>
              </ButtonGroup>
            </Box>
          </Stack>
        </CardActions>
      </Card >
      <AreYouSure
        open={!!deleteDialogId}
        handleClose={() => setDeleteDialogId(false)}
        callBackFunction={() => deleteTeam({ teamId: teamId })}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.account.token,
});

export default connect(mapStateToProps, {
  makeTeamHead: makeTeamHeadAction,
  deleteTeam: deleteTeamAction,
  updateTeamChatRoomLink: updateTeamChatRoomLinkAction
})(TeamInfo);
