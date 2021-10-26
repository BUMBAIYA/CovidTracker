import './css/App.css';
import { FormControl, Select, MenuItem, CardContent, Card } from '@mui/material';
import React, { useState, useEffect } from 'react'
import Infobox from './components/Infobox';
import Table from './components/Table';
import Map from './components/Map';
import { sortData } from './utils'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all").
      then(response => response.json()).
      then(data => {
        setCountryInfo(data);
      })
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").
        then((response) => response.json()).
        then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        })
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    const url = countryCode === "worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https:disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url).
      then(response => response.json()).
      then(data => {
        // set the country code to the dropdown
        setCountry(countryCode);
        // all data for a certain country.
        setCountryInfo(data);
      })
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              value={country}
              onChange={onCountryChange}
              variant="outlined">
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <Infobox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <Infobox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <Infobox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide New Cases</h3>
          {/* graph */}
        </CardContent>

      </Card>
    </div>
  );
}

export default App;
