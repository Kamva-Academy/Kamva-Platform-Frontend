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
import validateURL from '../../utils/validators/urlValidator'
import AreYouSure from '../../components/Dialog/AreYouSure'

import {
  makeTeamHeadAction,
  deleteTeamAction,
  updateTeamChatRoomLinkAction,
} from '../../redux/slices/events';


const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
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
  const [linkIsValid, setlinkIsValid] = useState(false)
  const [disableRequest, setDisableRequest] = useState(false)
  const [deleteDialogId, setDeleteDialogId] = useState(false)

  useEffect(() => {
    setlinkIsValid(validateURL(teamLink))
  }, [teamLink])

  async function updateTeamLink() {
    setDisableRequest(true)
    await updateTeamChatRoomLink({ teamId, chat_room: teamLink })
    setDisableRequest(false)
  }

  return (
    <Card className={classes.root}
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
        '&:hover': {
          transform: 'translateY(-0.1rem) scale(1.01)',
          boxShadow: '0 0.5em 1rem -1rem rgba(2, 2, 2, 2.5)',
        },
      }}

    >
      <CardContent>
        {playerId && <NotificationsActive color="primary" />}
        <Typography gutterBottom variant="h3" align="center">
          {name}
        </Typography>
        <Stack spacing={1}>
          {members.length > 0 ? members.map((member) => (
            <Grid container item key={member.id} alignItems='start' justifyContent='start'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={team_head == member.id}
                    onClick={() => {
                      makeTeamHead({ receipt: member.id, teamId })
                    }}
                    color="primary" />
                }
                label={`${member?.first_name} ${member?.last_name}` === ' ' ? 'بی‌نام!' : `${member?.first_name} ${member?.last_name}`}
                labelPlacement="end"
              />
            </Grid>

          ))
            :
            <Typography marginLeft='10px' marginTop='20px'>این تیم هیچ عضوی ندارد.</Typography>}
        </Stack>
      </CardContent>
      <CardActions sx={{ alignItems: 'center' }}>
        <Stack alignItems='center' width='100%' margin='0 auto' direction="column" spacing={1}>
          <Box margin='0 auto' width='100%'>
            <Box width='100%' height='10px'></Box>
            <Divider width='100%'></Divider>
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
              <Button disabled={linkIsNotValid} onClick={() => updateTeamLink()}>{'بروزرسانی'}</Button>
              <AreYouSure
                open={!!deleteDialogId}
                handleClose={() => setDeleteDialogId(false)}
                callBackFunction={() => deleteTeam({ teamId: teamId })}
              />
              <Button onClick={() => setDeleteDialogId(true)}>{'حذف'}</Button>
            </ButtonGroup>
          </Box>
        </Stack>
      </CardActions>
    </Card >
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
