import {
  Button,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import AreYouSure from '../components/Dialog/AreYouSure';
import MakeInvitation from '../components/Dialog/MakeInvitation';
import {
  createTeamAction,
  deleteInvitationAction,
  deleteTeamAction,
  getMyInvitationsAction,
  getOneEventInfoAction,
  getOneRegistrationReceiptAction,
  getTeamAction,
  getTeamInvitationsAction,
  inviteSomeoneAction,
  respondInvitationAction,
} from '../redux/slices/events'
import { addNotificationAction } from '../redux/slices/notifications';
import { toPersianNumber } from '../utils/translateNumber';
import Layout from './Layout';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 80,
    height: `calc(100vh - ${80}px)`,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  logo: {
    maxHeight: '80vh',
    maxWidth: '100%',
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
  },
  title: {
    fontSize: 40,
    fontWeight: 600,
    textShadow: '1px 1px #dbd9d9',
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 400,
    textShadow: '1px 1px #dbd9d9',
  },
  listItem: {
    fontSize: 20,
    fontWeight: 300,
    textShadow: '1px 1px #dbd9d9',
  },
  notificationTitle: {
    color: '#4d4a70',
  },
  content: {
    padding: '10px !important',
  },
  noPadding: {
    padding: '0px !important',
  },
  eventImage: {
    height: '100%',
    maxHeight: '300px',
    width: '100%',
    objectFit: 'cover',
  },
}));

const PROFILE_PICTURE = process.env.PUBLIC_URL + '/profile.png';


const TeamSelection = ({
  getMyInvitations,
  deleteTeam,
  respondInvitation,
  deleteInvitation,
  addNotification,
  getOneEventInfo,
  getTeam,
  getTeamInvitations,
  getOneRegistrationReceipt,
  inviteSomeone,
  createTeam,

  event,
  team,
  myInvitations,
  teamInvitations,
  receipt,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { eventId } = useParams()
  const [isCreateInvitationDialogOpen, changeCreateInvitationDialogStatus] = React.useState(false);
  const [isDeleteTeamDialogOpen, changeDeleteTeamDialogStatus] = React.useState(false);
  const [newTeamName, setNewTeamName] = React.useState('');

  useEffect(() => {
    getOneEventInfo({ id: eventId })
  }, [getOneEventInfo])

  useEffect(() => {
    if (event?.registration_receipt) {
      getOneRegistrationReceipt({ id: event?.registration_receipt });
    }
    if (event?.id) {
      getMyInvitations({ registrationReceiptId: event?.id });
    }
  }, [event]);

  useEffect(() => {
    if (receipt?.team) {
      getTeam({ teamId: receipt?.team })
      getTeamInvitations({ teamId: receipt?.team });
    }
  }, [receipt])

  if (event?.user_registration_status == 'NotRegistered') {
    history.push(`/event/${eventId}/registration_form/`);
  }

  const doCreateTeam = () => {
    if (!newTeamName) {
      addNotification({
        message: 'لطفاً نام تیم را وارد کنید.',
        type: 'error',
      });
      return;
    }
    createTeam({ name: newTeamName, registration_form: event?.registration_form });
  }

  console.log(myInvitations)

  return (
    <Layout>
      <Grid
        container
        justify='space-evenly'
        alignItems='flex-start'
        spacing={4}>
        <Grid item xs={12}>
          <Typography align='center' className={classes.title}>{'تیم‌کشی'}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid component={Paper} container justify="center" alignItems='flex-end' spacing={2}>
            <Grid item xs={12}>
              <Typography fullWidth align='center' variant='h2'>
                {'تیم شما'}
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Divider />
            </Grid>
            {(!team && !receipt?.team) &&
              <>
                <Grid item xs={12}>
                  <Typography fullWidth variant='caption'>
                    {'شما در تیمی عضو نیستید. یا خودتان یک تیم بسازید  و دیگران را به آن دعوت کنید، یا یکی از دعوت‌نامه‌هایی را که برایتان ارسال شده، قبول کنید.'}
                  </Typography>
                </Grid>
                <Grid item container xs={12} spacing={1}>
                  <Grid item xs={12}>
                    <Typography fullWidth align='center' variant='h5'>
                      {'ایجاد تیم جدید'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      size='small' fullWidth variant='outlined' value={newTeamName}
                      label='نام تیم' onChange={e => setNewTeamName(e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button fullWidth variant='contained' color='primary' onClick={doCreateTeam}>
                      {'ایجاد'}
                    </Button>
                  </Grid>
                </Grid>
              </>
            }
            {team &&
              <>
                <Grid item container alignItems='flex-start'>
                  <Grid item xs={2} />
                  <Grid item container justify='center' xs={8}>
                    <Typography fullWidth align='center' variant='h1'>
                      {`«${team.name}»`}
                    </Typography>
                  </Grid>
                  <Grid item container justify='flex-end' xs={2}>
                    <Tooltip title='حذف تیم' arrow>
                      <IconButton size='small' onClick={() => changeDeleteTeamDialogStatus(true)}>
                        <ClearIcon style={{ fontSize: '20px', color: 'red' }} />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
                {team?.members?.map((member, index) => {
                  return (
                    <Grid
                      item container direction='column'
                      justify='center' alignItems='center'
                      key={index}>
                      <Grid item>
                        <img alt='' style={{ borderRadius: '5px' }}
                          src={PROFILE_PICTURE} width='100px' />
                      </Grid>
                      <Grid item>
                        <Typography align='center'>
                          {`${member.first_name} ${member.last_name}`}
                        </Typography>
                      </Grid>
                    </Grid>)
                })}
              </>
            }
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid component={Paper} container justify="center" alignItems='flex-end' spacing={2}>
            <Grid item xs={2} />
            <Grid item xs={8}>
              <Typography fullWidth align='center' variant='h2'>
                {'دعوت‌نامه‌های ارسالی'}
              </Typography>
            </Grid>
            <Grid item container justify='flex-end' xs={2}>
              <Tooltip title={
                team?.id
                  ? 'ایجاد دعوت‌نامه'
                  : 'برای ارسال دعوت‌نامه، ابتدا باید یک تیم بسازید.'
              } arrow>
                <IconButton size='small' onClick={
                  team?.id
                    ? () => { changeCreateInvitationDialogStatus(true) }
                    : () => { }
                }>
                  <AddCircleOutlineIcon fontSize='large' />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid xs={12}>
              <Divider />
            </Grid>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>دعوت‌شده</TableCell>
                    <TableCell align='center'>آیا قبول کرده؟</TableCell>
                    <TableCell align='center'>لغو</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamInvitations?.map((invitation, index) =>
                    <TableRow key={index}>
                      <TableCell align='center'>
                        {`${invitation?.first_name} ${invitation.last_name}`}
                      </TableCell>
                      <TableCell align='center'>
                        {invitation?.has_accepted ? 'بله' : 'خیر'}
                      </TableCell>
                      <TableCell align='center'>
                        <Tooltip title='پس‌گرفتن دعوت‌نامه' arroiw>
                          <IconButton size='small'
                            onClick={() => { deleteInvitation({ invitationId: invitation?.id }) }}>
                            <ClearIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          <div style={{ height: '40px' }} />

          <Grid component={Paper} container justify="center" alignItems='flex-end' spacing={2}>
            <Grid item xs={12}>
              <Typography fullWidth align='center' variant='h2'>
                {'دعوت‌نامه‌های دریافتی'}
              </Typography>
            </Grid>
            <Grid xs={12}>
              <Divider />
            </Grid>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>تیم ارسال‌کننده</TableCell>
                    <TableCell align='center'>نام سرگروه</TableCell>
                    <TableCell align='center'>پاسخ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myInvitations
                    .filter(invitation => invitation.team !== team?.id) //todo: handle not showing self invitation in back
                    .map((invitation, index) =>
                      <TableRow key={index}>
                        <TableCell align='center'>
                          {invitation.team}
                        </TableCell>
                        <TableCell align='center'>
                          {invitation.first_name}
                        </TableCell>
                        <TableCell align='center'>
                          <IconButton size='small' disabled={team}
                            onClick={() => { respondInvitation({ invitationId: invitation?.id, has_accepted: 'true' }) }}>
                            <CheckCircleIcon color='secondary' />
                          </IconButton>
                          <IconButton size='small' disabled={team}
                            onClick={() => { respondInvitation({ invitationId: invitation?.id, has_accepted: 'false' }) }}>
                            <CancelIcon color='primary' />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
      <MakeInvitation
        open={isCreateInvitationDialogOpen}
        inviteSomeone={inviteSomeone}
        handleClose={() => changeCreateInvitationDialogStatus(!isCreateInvitationDialogOpen)}
        teamId={team?.id}
      />
      <AreYouSure
        open={isDeleteTeamDialogOpen}
        handleClose={() => changeDeleteTeamDialogStatus(!isDeleteTeamDialogOpen)}
        callBackFunction={() => deleteTeam({ teamId: team.id })}
      />
    </Layout>
  );
};



const mapStateToProps = (state) => ({
  event: state.events.event,
  receipt: state.events.receipt,
  team: state.events.team,
  myInvitations: state.events.myInvitations,
  teamInvitations: state.events.teamInvitations,
});

export default connect(
  mapStateToProps,
  {
    getMyInvitations: getMyInvitationsAction,
    deleteTeam: deleteTeamAction,
    respondInvitation: respondInvitationAction,
    deleteInvitation: deleteInvitationAction,
    createTeam: createTeamAction,
    inviteSomeone: inviteSomeoneAction,
    getTeamInvitations: getTeamInvitationsAction,
    getOneEventInfo: getOneEventInfoAction,
    addNotification: addNotificationAction,
    getOneRegistrationReceipt: getOneRegistrationReceiptAction,
    getTeam: getTeamAction,
  }
)(TeamSelection);