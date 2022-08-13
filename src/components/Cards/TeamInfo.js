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
} from '@mui/material';
import { NotificationsActive } from '@mui/icons-material';
import {makeStyles} from '@mui/styles'
import React from 'react';
import { connect } from 'react-redux';

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

  return (
    <Card className={classes.root}>
      <CardContent>
        {playerId && <NotificationsActive color="primary" />}
        <Typography gutterBottom variant="h3" align="center">
          {name}
        </Typography>
        <Grid container item xs={12} justify='flex-start'>
          {members.map((member) => (
            <FormControlLabel
              key={member.id}
              control={
                <Checkbox
                  checked={team_head == member.id}
                  onClick={() => {
                    makeTeamHead({ receipt: member.id, teamId })
                  }}
                  color="primary" />
              }
              label={`${member?.first_name} ${member?.last_name}`}
              labelPlacement="end"
            />
          ))}
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <ButtonGroup disabled variant="outlined" color="primary" fullWidth>
              <Button>{'ویرایش'}</Button>
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
