import './css/App.css';
import { FormControl, Select, MenuItem, CardContent, Card } from '@mui/material';
import React, { useState, useEffect } from 'react'
import Infobox from './src/component/Infobox';
import Table from './src/component/Table';
import Map from './src/component/Map';
import { sortData, prettyPrintStat } from './src/utility/utils';
import LineGraph from './src/component/LineGraph';
import 'leaflet/dist/leaflet.css';
import MyLocationIcon from '@mui/icons-material/MyLocation';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([27.90, 27.90]);
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  const findLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      setMapCenter([position.coords.latitude, position.coords.longitude]);
      setMapZoom(10);
    });
  }

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
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
      : `https://disease.sh/v3/covid-19/countries/${countryCode}?strict=true`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
        if (countryCode === "worldwide") {
          const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
              .then(response => response.json())
              .then(data => {
                setMapCountries(data);
              })
          };
          getCountriesData();
          setMapCenter([27.90, 27.90]);
          setMapZoom(2);
        }
        else {
          const tempCountry = [data];
          setMapCountries(tempCountry);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        }
      })
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <div className="app__logoWrapper">
            <div className="app__logo"></div>
            <h1>Covid-19 Tracker</h1>
          </div>
          <div className="app__headerRight">
            <div className="logo__location">
              <MyLocationIcon sx={{ fontSize: 40 }} onClick={findLocation} />
            </div>
            <FormControl className="app__dropdown">
              <Select
                value={country}
                onChange={onCountryChange}
                variant="outlined">
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map(country => (
                  <MenuItem key={country.value} value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="app__stats">
          <Infobox
            isRed={true}
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)} />
          <Infobox
            isRed={false}
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)} />
          <Infobox
            isRed={true}
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)} />
        </div>
        <div className="map__info">Click on circle to see details of country or choose from above dropdown</div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3 className="app__rightGraphHeader">Worldwide New {casesType} (90 days)</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
