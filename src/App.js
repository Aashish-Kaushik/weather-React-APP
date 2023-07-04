import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [filter, setFilter] = useState('location');
  const [response, setResponse] = useState();
  const [stateName, setStateName] = useState();
  // const [weather, setweather] = useState();
  const API_KEY = 'e1b607169f0eb7011c14e8e0e1b8c6d2';

  const searchWeatherByLocation = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${filter}&units=metric&appid=${API_KEY}`
      );
      console.log(res.data);
      setResponse(res.data.main);
    } catch (error) {
      console.error(error);
    }
  };
  const searchWeatherByPincode = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${filter},IN&appid=${API_KEY}`);
      console.log(res.data);
      setStateName(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{ display: 'flex', flexDirection: 'column', background: 'cyan', padding: '50px', borderRadius: '10px' }}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Weather Status </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="location"
            name="radio-buttons-group">
            <FormControlLabel
              value="location"
              typeof="text"
              onChange={(e) => setFilter(e.target.value)}
              control={<Radio />}
              label="by location"
            />
            <FormControlLabel
              value="pincode"
              typeof="number"
              onChange={(e) => setFilter(e.target.value)}
              control={<Radio />}
              label="by PinCode"
            />
          </RadioGroup>
        </FormControl>

        {filter === 'location' && (
          <>
            <form method="post" action={searchWeatherByLocation}>
              <TextField
                id="standard-basic"
                type="text"
                placeholder="enter your city name"
                label="Location"
                variant="standard"
                required
              />
              <button onClick={searchWeatherByLocation} type="submit">
                Check
              </button>
            </form>
          </>
        )}
        {filter === 'pincode' && (
          <form method="post" action={searchWeatherByPincode}>
            <TextField
              id="standard-basic"
              type="text"
              placeholder="enter your area pincode"
              label="PinCode"
              variant="standard"
              required
            />
            <button type="submit" onClick={searchWeatherByPincode}>
              Check
            </button>
          </form>
        )}
        {response && (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>temp_min</TableCell>
                    <TableCell align="right">temp_max</TableCell>
                    <TableCell align="right">temp</TableCell>
                    <TableCell align="right">sea_level</TableCell>
                    <TableCell align="right">pressure</TableCell>
                    <TableCell align="right">humidity</TableCell>
                    <TableCell align="right">grnd_level</TableCell>
                    <TableCell align="right">feels_like</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key="table" sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {response.temp_min}
                    </TableCell>
                    <TableCell align="right">{response.temp_max}</TableCell>
                    <TableCell align="right">{response.temp}</TableCell>
                    <TableCell align="right">{response.sea_level}</TableCell>
                    <TableCell align="right">{response.pressure}</TableCell>
                    <TableCell align="right">{response.humidity}</TableCell>
                    <TableCell align="right">{response.grnd_level}</TableCell>
                    <TableCell align="right">{response.feels_like}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        {stateName && (
          <>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value="yourCity"
                  label="Age"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
