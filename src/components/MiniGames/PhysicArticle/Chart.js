import { Grid, makeStyles, Slider } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const theme = createMuiTheme({
  direction: 'ltr', // Both here and <body dir="rtl">
});

const useStyles = makeStyles(() => ({
  row1: {
    height: '85vh',
  },

  row2: {
    height: '15vh',
  },
}));

const step = 10;
const count = 20;
const labels = [...Array(count).keys()].map((x) => x * step + step);

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

const options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          max: Math.log(count * step) * 1.1,
          min: Math.log(step) * 0.9,
          stepSize: 0.5,
        },
      },
    ],
  },
};

const ChartTab = () => {
  const classes = useStyles();
  const [lastPoint, setLastPoint] = useState(2);

  const changeChart = (newInput) => {
    setLastPoint(newInput / step);
  };

  return (
    <>
      <Grid container direction="column">
        <Grid container item direction="row" className={classes.row1}>
          <Line
            height={5}
            width={5}
            data={{
              labels,
              datasets: [
                {
                  ...chartConfig,
                  data: labels
                    .slice(0, lastPoint)
                    .map((label) => Math.log(label)),
                },
              ],
            }}
            options={options}
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
                  max={count * step}
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
