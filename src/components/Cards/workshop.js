import React, { useState, useEffect } from 'react'
import {
  Button,
  Container,
  makeStyles,
  Tab,
  Tabs,
  Grid,
  Paper,
  Typography,
  ButtonGroup,
  CssBaseline,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  paper: {
    width: '100%',
    height: '500px',
  }
}));

const MentorPage = ({ }) => {
  const classes = useStyles();
  const [tabNumber, setTabNumber] = useState(0);

  console.log(tabNumber)

  return (
    <Container className={classes.root}>
      <CssBaseline />
      <Grid container spacing={2} direction='row' justify='space-around'>
        <Grid container item sm={3} xs={12} direction='column' justify='space-between'>
          <Grid item>
            <ButtonGroup orientation='vertical' variant="contained" color="primary" fullWidth>
              <Button>
                کارگاه‌ها
              </Button>
              <Button>تیم‌ها</Button>
              <Button>درخواست‌ها</Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <Button fullWidth color='primary'>
              بازگشت
            </Button>
          </Grid>
        </Grid>

        <Grid item sm={9} xs={12} justify='center'>
          <Paper className={classes.paper}>
            salam
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default MentorPage;