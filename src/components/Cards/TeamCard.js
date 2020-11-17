import React from 'react';
import {
  Button,
  makeStyles,
  Grid,
  Typography,
  CardContent,
  CardActionArea,
  Card,
  CardMedia,
  CardActions,
  Chip,
  ButtonGroup,
  Avatar,
} from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  icon: {
    textAlign: 'center',
  },
});

const TeamCard = ({ name, teamMembers, }) => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} sm={6} md={4} justify='center'>
      <Card className={classes.root}>
        <CardActionArea disabled>
          <CardContent>
            <Typography gutterBottom variant="h5">
              {' تیم'}
            </Typography>
            <Typography gutterBottom variant="h3">
              {name}
            </Typography>
            <Grid container direction='row' justify='center'>
              <Avatar className={classes.orange}>N</Avatar>
              <Avatar className={classes.orange}>N</Avatar>
              <Avatar className={classes.orange}>N</Avatar>
            </Grid>
          </CardContent>
          <Grid container>
          </Grid>
        </CardActionArea>
        <CardActions>
          <ButtonGroup variant='outlined' color="primary" fullWidth>
            <Button>
              مشاهده
            </Button>
            <Button>
              سابقه
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default TeamCard;



// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
// }));

// const InstitutionCard = () => {
//   const classes = useStyles();

//   return (
//     <Card className={classes.root}>
//       <CardHeader
//         avatar={
//           <Avatar aria-label="recipe" className={classes.avatar}>
//             R
//         </Avatar>
//         }
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title="Shrimp and Chorizo Paella"
//         subheader="September 14, 2016"
//       />
//       <CardMedia
//         className={classes.media}
//         image="/static/images/cards/paella.jpg"
//         title="Paella dish"
//       />
//       <CardContent>
//         <Typography variant="body2" color="textSecondary" component="p">
//           This impressive paella is a perfect party dish and a fun meal to cook together with your
//           guests. Add 1 cup of frozen peas along with the mussels, if you like.
//       </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>
//         <IconButton
//           className={clsx(classes.expand, {
//             [classes.expandOpen]: expanded,
//           })}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </IconButton>
//       </CardActions>
//     </Card>
//   )
// }