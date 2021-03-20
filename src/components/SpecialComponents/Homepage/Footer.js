import { Container, Grid, IconButton, makeStyles, SvgIcon, Typography } from '@material-ui/core';
import {
  Instagram as InstagramIcon,
  Telegram as TelegramIcon,
} from '@material-ui/icons';
import LanguageIcon from '@material-ui/icons/Language';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    padding: theme.spacing(2),
    backgroundColor: '#feceab',
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid container justify="center" alignItems="center">
        <Grid xs={12} item container justify='center' alignItems='center' spacing={2}>
          <Grid item>
            <IconButton
              component="a"
              target="_blank"
              href="https://t.me/rastaiha">
              <TelegramIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              component="a"
              target="_blank"
              href="https://www.instagram.com/rastaiha/">
              <InstagramIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              component="a"
              target="_blank"
              href="https://www.aparat.com/Rastaiha/%D8%AC%D9%85%D8%B9_%D8%B9%D9%84%D9%85%DB%8C-%D8%AA%D8%B1%D9%88%DB%8C%D8%AC%DB%8C_%26laquo%3B%D8%B1%D8%B3%D8%AA%D8%A7%26raquo">
              <SvgIcon>
                <path d="M 10.941406 3.066406 L 8.78125 2.582031 C 7.023438 2.183594 5.273438 3.289062 4.878906 5.046875 L 4.386719 7.222656 C 5.800781 4.976562 8.179688 3.394531 10.941406 3.066406 Z M 3.066406 13.058594 L 2.582031 15.21875 C 2.183594 16.976562 3.289062 18.726562 5.046875 19.121094 L 7.222656 19.613281 C 4.976562 18.199219 3.394531 15.820312 3.066406 13.058594 Z M 18.953125 4.878906 L 16.777344 4.386719 C 19.023438 5.800781 20.605469 8.179688 20.933594 10.941406 L 21.417969 8.78125 C 21.816406 7.023438 20.710938 5.273438 18.953125 4.878906 Z M 13.058594 20.933594 L 15.21875 21.417969 C 16.976562 21.816406 18.726562 20.710938 19.121094 18.953125 L 19.613281 16.777344 C 18.199219 19.023438 15.820312 20.605469 13.058594 20.933594 Z M 13.058594 20.933594 " />
                <path d="M 12 4 C 7.582031 4 4 7.582031 4 12 C 4 16.417969 7.582031 20 12 20 C 16.417969 20 20 16.417969 20 12 C 20 7.582031 16.417969 4 12 4 Z M 10 6.5 C 11.105469 6.5 12 7.394531 12 8.5 C 12 9.605469 11.105469 10.5 10 10.5 C 8.894531 10.5 8 9.605469 8 8.5 C 8 7.394531 8.894531 6.5 10 6.5 Z M 8.5 16 C 7.394531 16 6.5 15.105469 6.5 14 C 6.5 12.894531 7.394531 12 8.5 12 C 9.605469 12 10.5 12.894531 10.5 14 C 10.5 15.105469 9.605469 16 8.5 16 Z M 11 12 C 11 11.449219 11.449219 11 12 11 C 12.550781 11 13 11.449219 13 12 C 13 12.550781 12.550781 13 12 13 C 11.449219 13 11 12.550781 11 12 Z M 14 17.5 C 12.894531 17.5 12 16.605469 12 15.5 C 12 14.394531 12.894531 13.5 14 13.5 C 15.105469 13.5 16 14.394531 16 15.5 C 16 16.605469 15.105469 17.5 14 17.5 Z M 15.5 12 C 14.394531 12 13.5 11.105469 13.5 10 C 13.5 8.894531 14.394531 8 15.5 8 C 16.605469 8 17.5 8.894531 17.5 10 C 17.5 11.105469 16.605469 12 15.5 12 Z M 15.5 12 " />
              </SvgIcon>
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              component="a"
              target="_blank"
              href="https://www.rastaiha.ir">
              <LanguageIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item>
          <Typography align='center'>
            تمامی حقوق برای جمع علمی-ترویجی رستا محفوظ است. ۱۳۹۹-۱۴۰۰
          </Typography>
        </Grid>
      </Grid>

    </Container>
  );
}

export default Footer;
