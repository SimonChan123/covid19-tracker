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
import Map from './components/Map';
import Table from './components/Table';
import { sortData, prettyPrintStat } from './utils/util';
import LineGraph from './components/LineGraph';
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom, setmapZoom] = useState(3);
  const [casesType, setcasesType] = useState("cases");

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      })
  }, []);

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

          setMapCountries(data);
          setCountries(countries);

          const sortedData = sortData(data);
          setTableData(sortedData);
        })
        .catch((error) => {
          console.log(error);
        })
    };
    getCountryData();
  }, []);

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

        setmapZoom(4);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        console.log(mapCenter);
      })
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID 19 Tracker</h1>
          {/* Dropdown Menu */}
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              {/* loop through countries */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              { countries.map((country) => (
                  <MenuItem value={country.value} key={country.value}>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        {/* Info Boxes */}
        <div className="app__stats">
          <InfoBox 
            active={casesType === "cases"}
            onClick={e => setcasesType("cases")}
            title="Coronarvirus Cases" 
            cases={prettyPrintStat(countryInfo.todayCases)} 
            total={prettyPrintStat(countryInfo.cases)} 
          />
          <InfoBox 
            isGreen={true}
            active={casesType === "recovered"}
            onClick={e => setcasesType("recovered")}
            title="Recovered" 
            cases={prettyPrintStat(countryInfo.todayRecovered)} 
            total={prettyPrintStat(countryInfo.recovered)} 
          />
          <InfoBox 
            active={casesType === "deaths"}
            onClick={e => setcasesType("deaths")}
            title="Deaths" 
            cases={prettyPrintStat(countryInfo.todayDeaths)} 
            total={prettyPrintStat(countryInfo.deaths)} 
          />
        </div>

        {/* World Map */}
        <Map 
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter} 
          zoom={mapZoom} 
        />
      </div>
      <Card className="app__right" style={{ backgroundColor:"wheat" }}>
        <CardContent>
          <h3>Live cases by country</h3>
          {/* Table */}
          <Table countries={tableData} />
          <br />
          <br />
          <h3>Worldwide {casesType}</h3>
          {/* Graph */}
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
