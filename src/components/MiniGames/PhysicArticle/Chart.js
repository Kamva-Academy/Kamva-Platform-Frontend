import { Grid, makeStyles, Slider } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const theme = createMuiTheme({
  direction: 'ltr', // Both here and <body dir="rtl">
});

const useStyles = makeStyles((theme) => ({
  row1: {
    height: '85vh',
  },

  row2: {
    height: '15vh',
  },
}));

const step = 10;

const chartConfig = {
  label: 'طول کوتاه‌ترین مسیر بر حسب تعداد رئوس',
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderColor: 'rgba(75,192,192,1)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(75,192,192,1)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 5,
  pointHoverRadius: 8,
  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
};

const ChartTab = () => {
  const classes = useStyles();
  const [labels, setLabels] = useState([step, 2 * step]);

  const changeChart = (newInput) => {
    setLabels([...Array(newInput / step).keys()].map((x) => x * step + step));
  };

  return (
    <>
      <Grid container direction="column">
        <Grid container item direction="row" className={classes.row1}>
          <Line
            height={5}
            width={5}
            options={{ maintainAspectRatio: false }}
            data={{
              labels,
              datasets: [
                {
                  ...chartConfig,
                  data: labels.map((label) => Math.log(label)),
                },
              ],
            }}
          />
        </Grid>
        <Grid
          container
          item
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.row2}
          spacing={2}>
          <Grid item style={{ width: '80%' }}>
            <ThemeProvider theme={theme}>
              <div dir="ltr">
                <Slider
                  defaultValue={2 * step}
                  valueLabelDisplay="auto"
                  step={step}
                  marks
                  min={step}
                  max={20 * step}
                  onChangeCommitted={(e, val) => changeChart(val)}
                />
              </div>
            </ThemeProvider>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ChartTab;
