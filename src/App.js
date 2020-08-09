import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from '@material-ui/core';
import './App.css';
import InfoBox from './components/InfoBox';
import Map from './components/Map'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      })
  }, [])

  useEffect(() => {
    const getCountryData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => {
            return ({
              id: country.countryInfo._id,
              name: country.country,
              value: country.countryInfo.iso3
            });
          });

          setCountries(countries);
        })
        .catch((error) => {
          console.log(error);
        })
    };
    getCountryData();
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    
    const url = countryCode === 'worldwide' 
    ? 'https://disease.sh/v3/covid-19/all'
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        console.log(countryCode);
        setCountryInfo(data);
        console.log(data);
      })
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              {/* loop through countries */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              { countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronarvirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        {/* Map */}
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live cases by country</h3>

          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
