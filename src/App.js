import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from '@material-ui/core';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountryData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              id: country.countryInfo._id,
              name: country.country,
              value: country.countryInfo.iso2
            }
          ))

          setCountries(countries);
        })
        .catch((error) => {
          console.log(error);
        })
    };
    getCountryData();
  }, [])

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID 19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select
            variant="outlined"
            value=""
          >
            {/* loop through countries */}
            {
              countries.map((country) => (
                <MenuItem value={country.val} key={country.id}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      {/* HEADER */}
      {/* TITLE + Select drop down */}

      {/* Infoboxes */}
      {/* Infoboxes */}
      {/* Infoboxes */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
