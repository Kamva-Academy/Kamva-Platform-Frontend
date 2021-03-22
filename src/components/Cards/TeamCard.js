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
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link } from 'react-router-dom';

import { visitWorkshopPlayerAction } from '../../redux/slices/mentor';

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
  const t = useTranslate();

  return (
    <Card className={classes.root}>
      <CardActionArea disabled>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {t('team')}
          </Typography>
          <Typography gutterBottom variant="h3">
            {team?.player?.group_name}
          </Typography>
          <Grid container direction="row" justify="center">
            {team?.player?.team_members?.map((tm) => (
              // <Tooltip title={tm} aria-label={tm}>
              //   <Avatar className={classes.orange}>{tm}</Avatar>
              // </Tooltip>
              <div key={tm}>{tm}</div>
            ))}
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonGroup variant="outlined" color="primary" fullWidth>
          <Button
            onClick={() => visitPlayerWorkshop({ workshopPlayerId: team.id })}
            component={Link}
            to={`/workshop/${team.player.uuid}/${fsmId}/${fsmFirstState}/`}>
            {t('watch')}
          </Button>
          <Button>{t('history')}</Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default connect(null, {
  visitPlayerWorkshop: visitWorkshopPlayerAction,
})(TeamCard);
