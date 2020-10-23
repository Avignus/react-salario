import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,
    marginRight: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.type,
  },
}));

function App() {
  const [amount, setAmount] = useState('');
  const [valueIRRF, setIRRF] = useState(0);
  const [baseINSS, setBaseINSS] = useState('');
  const [baseIRRF, setBaseIRRF] = useState('');
  const [baseValue, setBaseValue] = useState(0);
  const [percentageBase, setPercentageBase] = useState(0);
  const [percentageIRRF, setPercentageIRRF] = useState(0);
  const [liquid, setLiquid] = useState(0);
  const [liquidPercentage, setLiquidPercentage] = useState(0);
  // const [sumToll, setSumToll] = useState(0);
  const classes = useStyles();
  const getIRRF = (value, base) => {
    console.log(base, 'base');
    if (value > 1909.99 && value < 2826.65) {
      let discount = value * 0.075;
      let IRRF = discount - 142.8;
      let liquidValue = value - IRRF;
      let percentage = base / 100;
      let liquidPercentage = liquidValue / percentage;

      let percentageIRRF = IRRF / percentage;
      console.log(percentageIRRF);
      setPercentageIRRF(percentageIRRF.toFixed(2));
      setBaseIRRF(value.toFixed(2));
      setIRRF(IRRF.toFixed(2));
      setLiquid(liquidValue.toFixed(2));
      setLiquidPercentage(liquidPercentage.toFixed(2));
    } else if (value > 2826.65 && value < 3751.05) {
      let discount = value * 0.15;
      let IRRF = discount - 354.8;
      let percentage = base / 100;
      let percentageIRRF = IRRF / percentage;
      let liquidValue = value - IRRF;
      let liquidPercentage = liquidValue / percentage;
      console.log(percentageIRRF);
      setBaseIRRF(value.toFixed(2));
      setPercentageIRRF(percentageIRRF.toFixed(2));
      setIRRF(IRRF.toFixed(2));
      setLiquid(liquidValue.toFixed(2));
      setLiquidPercentage(liquidPercentage.toFixed(2));
    } else if (value > 3751.06 && value < 4664.68) {
      let discount = value * 0.225;
      let IRRF = discount - 636.13;
      let liquidValue = value - IRRF;
      let percentage = base / 100;
      let liquidPercentage = liquidValue / percentage;
      let percentageIRRF = IRRF / percentage;
      setPercentageIRRF(percentageIRRF.toFixed(2));
      setBaseIRRF(value.toFixed(2));
      setIRRF(IRRF.toFixed(2));
      setLiquid(liquidValue.toFixed(2));
      setLiquidPercentage(liquidPercentage.toFixed(2));
    } else if (value > 4664.68) {
      const discount = value * 0.275;
      console.log(discount);
      const IRRF = discount - 869.36;

      let percentage = value / 100;
      let percentageIRRF = IRRF / percentage;
      setPercentageIRRF(percentageIRRF.toFixed(2));
      setBaseIRRF(value.toFixed(2));
      setIRRF(IRRF.toFixed(2));
      setLiquid((value - IRRF).toFixed(2));
    }
  };
  const getValue = (valueTyped) => {
    let value = parseFloat(valueTyped);
    let toll = 0;

    if (value < 1045) {
      let base = 'Até 1045,00';
      toll = value * 0.075;
      let percentage = value / 100;
      let percentageINSS = toll / percentage;
      setPercentageBase(percentageINSS.toFixed(2));
      setBaseINSS(base);
      // setPercentageBase(7.5);

      setAmount(toll.toFixed(2));
      setLiquid(value - toll);
    }

    if (value > 1045 && value < 2089.6) {
      setBaseINSS('Até 2089,60');
      let sumToll = 1045 * 0.075;
      sumToll += (value - 1045) * 0.09;

      setAmount(sumToll.toFixed(2));
      // setPercentageBase(9);
      setLiquid(value - toll);
    } else if (value > 2089.6 && value < 3134.4) {
      setBaseINSS('Até 3134,30');
      let firstValue = 1045 * 0.075;
      console.log(firstValue);
      let secondValue = (2089.6 - 1045) * 0.09;
      console.log(secondValue);
      let floor = (value - 2089.6) * 0.12;
      console.log(floor);
      let total = firstValue + secondValue + floor;
      let liquid = value - total;
      setLiquid(liquid);
      getIRRF(liquid, value);
      let percentage = value / 100;
      let percentageINSS = total / percentage;
      setPercentageBase(percentageINSS.toFixed(2));
      setAmount(total.toFixed(2));
      // setLiquid(value - total);
      // getIRRF(liquid);
    } else if (value > 3134.41 && value < 6101.06) {
      setBaseINSS('Até 6101.06');
      let firstValue = 1045 * 0.075;
      let secondValue = (2089.6 - 1045) * 0.09;
      let thirdValue = (3134.4 - 2089.6) * 0.12;
      let floor = (value - 3134.4) * 0.14;
      let total = firstValue + secondValue + thirdValue + floor;
      let liquid = value - total;
      getIRRF(liquid, value);
      console.log(value - total, 'líquido');
      let percentage = value / 100;
      let percentageINSS = total / percentage;
      setPercentageBase(percentageINSS.toFixed(2));
      setAmount(total.toFixed(2));
    }
  };
  const handleChange = (e) => {
    // setAmount(e.target.value);
    let value = e.target.value;
    let calculation = parseInt(value);

    // console.log(calculation);
    // getRange(calculation);
    getValue(calculation);
  };

  return (
    <div className="App">
      <div className={classes.root}>
        <Grid container xs={12} justify="center">
          <h1>React Salario</h1>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {/* <Paper className={classes.paper}></Paper> */}
            <TextField
              id="standard-full-width"
              label="Valor"
              style={{ margin: 8 }}
              placeholder="Valor em R$"
              helperText="Calculado"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={baseINSS}
              id="standard-full-width"
              label="Base"
              style={{ margin: 8, color: 'black' }}
              placeholder="Base cálculo INSS"
              helperText="Calculado"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={`R$ ${amount} (${percentageBase}%)`}
              id="standard-full-width"
              label="Desconto INSS"
              style={{ margin: 8 }}
              placeholder="Desconto INSS"
              helperText="Calculado"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            {/* <Paper className={classes.paper}> */}
            <TextField
              value={`R$ ${baseIRRF}`}
              id="standard-full-width"
              label="Base IRRF"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              helperText="Calculado"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* </Paper> */}
          </Grid>

          <Grid item xs={3}>
            <TextField
              value={`R$ ${valueIRRF} (${percentageIRRF}%)`}
              id="standard-full-width"
              label="IRRF"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              helperText="Calculado"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={`R$ ${liquid} (${liquidPercentage}%)`}
              id="standard-full-width"
              label="IRRF"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              helperText="Calculado"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* <Grid item xs={3}>
            <TextField
              disabled
              id="standard-full-width"
              label="Label"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              helperText="Full width!"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid> */}
        </Grid>
        {/* <Grid container spacing={3}> */}
        {/* <Grid item xs>
            <Paper className={classes.paper}>
              <TextField
                value={`R$ ${liquid}`}
                id="standard-full-width"
                label="Label"
                style={{ margin: 8 }}
                placeholder="Placeholder"
                helperText="Full width!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Paper>
          </Grid> */}
        {/* <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>xs</Paper>
          </Grid> */}
        {/* </Grid> */}
      </div>
    </div>
  );
}

export default App;
