import {
  Card,
  CardActionArea,
  CardMedia,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 190,
  },
  media: {
    height: 190,
  },
  cardContent: {
    padding: theme.spacing(1),
  },
  footer: {
    background: '#596E79',
    color: 'white',
    borderRadius: 0,
  },
}));

function OurTeamMemberCard({ member }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={member.photo}
          title={member.name}
        />
        <div className={classes.cardContent}>
          <Typography variant="h4" component="h4">
            {member.name}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            {'تیم ' + member.team}
          </Typography>
          <Typography variant="h6">{member.desc}</Typography>
        </div>
      </CardActionArea>
      {member.extra && (
        <Paper className={classes.footer}>
          <Typography component="h5" variant="body2" align="center">
            {member.extra}
          </Typography>
        </Paper>
      )}
    </Card>
  );
}

export default OurTeamMemberCard;
