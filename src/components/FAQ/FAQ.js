import {
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

import questions from './questions'


const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: 'justify',
    textJustify: 'inter-word',
  },
}));


const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // backgroundColor: '#7400B8',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);



const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'block',
  },
}))(MuiAccordionDetails);



const FAQ = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    questions.map((question, index) =>
      <Accordion square expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography variant='h6'>{question.text}</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container direction='column' spacing={2}>
            {question.answerParagraphs &&
              question.answerParagraphs.map((answer) => {
                return (
                  <Grid item>
                    <Typography className={classes.text}>
                      {answer}
                    </Typography>
                  </Grid>
                )
              })
            }
            {
              question.answerItems &&
              question.answerItems.map((item) => {
                return (
                  <Grid item>
                    <Typography className={classes.text}>
                      <li>{item}</li>
                    </Typography>
                  </Grid>
                )
              })
            }
          </Grid>
        </AccordionDetails>
      </Accordion >
    )
  );
}

export default FAQ;