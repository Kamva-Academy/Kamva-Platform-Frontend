import {
  Badge,
  Button,
  ButtonGroup,
  Container,
  Fab,
  Grid,
  Hidden,
  makeStyles,
  Paper,
  Slider,
  TextField,
  Toolbar,
} from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import merge from 'lodash.merge';
import React, { useEffect, useState } from 'react'
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
}))


const initialData = {
  labels: [50, 100],
  datasets: [
    {
      label: 'نمودار تعداد خوشگی بر حسب تعداد رئوس',
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
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [Math.log(50), Math.log(100)]
    }
  ]
};

const ChartTab = ({ }) => {
  const classes = useStyles();
  const [data, setData] = useState(initialData);
  const [lastInput, setLastInput] = useState(20);

  const changeChart = (newInput) => {
    console.log(newInput)
    const newData = data;
    if (newInput > lastInput) {
      console.log(1)
      newData.datasets[0].data.push(Math.log(newInput))
      newData.labels.push(newInput)
    } else if (newInput < lastInput) {
      console.log(2)
      newData.datasets[0].data.pop();
      newData.labels.pop()
    }
    console.log(newData.datasets[0].data)
    console.log(newData.labels)
    setData(newData)
    setLastInput(newInput)
  }

  return (
    <>
      <Grid container direction='column'>
        <Grid container item direction='row' className={classes.row1}>
          <Line height={5} width={5} options={{ maintainAspectRatio: false }} data={data} />
        </Grid>
        <Grid
          container item
          direction='row'
          justify='center'
          alignItems='center'
          className={classes.row2}
          spacing={2}>
          <Grid item style={{ width: '80%' }}>
            <ThemeProvider theme={theme}>
              <div dir="ltr">
                <Slider
                  defaultValue={100}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={50}
                  marks
                  min={50}
                  max={400}
                  onChangeCommitted={(e) => changeChart(parseInt(e.target.textContent))}
                />
              </div>
            </ThemeProvider>
          </Grid>

        </Grid>
      </Grid>
    </>
  )
}

export default ChartTab;