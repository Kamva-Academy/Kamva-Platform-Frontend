import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { visitPlayerWorkshop } from '../../redux/actions/mentor';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  icon: {
    textAlign: 'center',
  },
});

const TeamCard = ({ team, fsmId, fsmFirstState, visitPlayerWorkshop }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea disabled>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {' تیم'}
          </Typography>
          <Typography gutterBottom variant="h3">
            {team.player.group_name}
          </Typography>
          <Grid container direction="row" justify="center">
            {team.player.team_members.map((tm) => (
              // <Tooltip title={tm} aria-label={tm}>
              //   <Avatar className={classes.orange}>{tm}</Avatar>
              // </Tooltip>
              <div>{tm}</div>
            ))}
          </Grid>
        </CardContent>
        <Grid container></Grid>
      </CardActionArea>
      <CardActions>
        <ButtonGroup variant="outlined" color="primary" fullWidth>
          <Button
            onClick={() => visitPlayerWorkshop({ playerWorkshopId: team.id })}
            component={Link}
            to={`/workshop/${team.player.uuid}/${fsmId}/${fsmFirstState}/`}>
            مشاهده
          </Button>
          <Button>سابقه</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default connect(null, { visitPlayerWorkshop })(TeamCard);
