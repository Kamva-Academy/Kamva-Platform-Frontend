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
} from '@mui/material';
import { NotificationsActive } from '@mui/icons-material';
import { makeStyles } from '@mui/styles'
import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import validateURL from '../../utils/validators/urlValidator'

import {
  makeTeamHeadAction,
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
}) => {
  const classes = useStyles();
  const [teamLink, setTeamLink] = useState('')
  const [linkIsNotValid, setLinkIsNotValid] = useState(false)

  useEffect(() => {
    setLinkIsNotValid(!validateURL(teamLink))
  }, [teamLink])

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
        <Grid container spacing={1}>
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
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <TextField
              error= {linkIsNotValid && true}
              helperText= {linkIsNotValid && "ورودی وارد شده لینک معتبری نیست"}
              id="standard-multiline-static"
              label="لینک تیم"
              multiline
              rows={3}
              placeholder="somelink.somedomain"
              variant="outlined"
              onChange={(e) => setTeamLink(e.target.value)}
              sx={{marginBottom: '30px', width: '100%', direction: 'rtl'}}
            />
            <ButtonGroup sx={{ height: '40px' }} disabled variant="outlined" color="primary" fullWidth>
              <Button>{'بروزرسانی لینک'}</Button>
              <Button>{'حذف'}</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </CardActions>
    </Card >
  );
};

const mapStateToProps = (state) => ({
  token: state.account.token,
});

export default connect(mapStateToProps, {
  makeTeamHead: makeTeamHeadAction,
})(TeamInfo);
