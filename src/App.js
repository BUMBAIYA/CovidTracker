import { useState, useEffect } from "react";
//Material ui
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
//Components
import InfoBox from "./components/InfoBox.js";
import Page from "./components/Page.js";
import Map from "./components/Map.js";
import RadioButtonsGroup from "./components/RadioButtonGroup.js";
//utils
import { printStats } from "./utility/utils.js";
//Table Components
import Table from "./components/Table";
import TableCardHeader from "./components/Table/TableCardHeader.js";
//icon
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import ApiIcon from '@mui/icons-material/Api';
import 'leaflet/dist/leaflet.css';


function App() {
    const theme = useTheme();
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [mapCenter, setMapCenter] = useState([27.90, 27.90]);
    const [mapZoom, setMapZoom] = useState(2);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");

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
      <Page title="Covid Tracker | Home">
        <Container maxWidth="xl" 
          sx={{ 
            paddingTop: "24px",
            paddingBottom: "40px",
          }}>
          <Grid container spacing={2}>
            <Grid items xs={12} sm={12} md={6} 
              sx={{
                [theme.breakpoints.up('md')]: {padding: "0.5rem 1rem"},
                [theme.breakpoints.down('md')]: {padding: "0.2rem 1rem"}
              }}>
                <Typography 
                  sx={{fontWeight: 900}}
                  variant="h3"
                  color={theme.palette.secondary.dark}
                  >
                    CovidTracker
                </Typography>
            </Grid>
            <Grid items xs={12} sm={12} md={6}>
                <Box 
                  component="div" 
                  sx={{
                    [theme.breakpoints.up('md')]: {display: "flex", justifyContent: "right", alignItems: "center", padding: "0.5rem 1rem"},
                    [theme.breakpoints.down('md')]: {padding: "0rem 1rem"}
                    }}>
                  <Typography variant="button">Source Code</Typography>
                  <IconButton href="https://github.com/BUMBAIYA/CovidTracker" color="secondary" size="large">
                    <GitHubIcon/>
                  </IconButton>
                  <Typography variant="button">API</Typography>
                  <IconButton href="https://disease.sh" color="secondary" size="large">
                    <ApiIcon/>
                  </IconButton>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoBox
                title={`${country} cases`}
                avatar={<CoronavirusOutlinedIcon fontSize="inherit" />}
                total={printStats(countryInfo.cases)}
                cases={printStats(countryInfo.todayCases)}
                bgcolor={theme.palette.gradients.info}
                showcircle
                pseudocirclebg="info"
                buttonbg="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <InfoBox
                title="Recovered"
                avatar={<HealingOutlinedIcon fontSize="inherit" />}
                total={printStats(countryInfo.recovered)}
                cases={printStats(countryInfo.todayRecovered)}
                bgcolor={theme.palette.gradients.primary}
                showcircle
                pseudocirclebg="primary"
                buttonbg="primary"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <InfoBox
                title="Deaths"
                avatar={<DangerousOutlinedIcon fontSize="inherit" />}
                total={printStats(countryInfo.deaths)}
                cases={printStats(countryInfo.todayDeaths)}
                bgcolor={theme.palette.gradients.error}
                showcircle
                pseudocirclebg="error"
                buttonbg="error"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Card>
                <TableCardHeader
                  title="Total cases by country"
                  tooltiptitle="Click on column header to sort data"
                  headerbg={theme.palette.info.darker}
                  avatar={<TableChartOutlinedIcon fontSize="inherit" />}
                  avatarbg={theme.palette.secondary.darker}
                />
                <Table />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Card sx={{padding: 2.5}}>
                <Box 
                  sx={{ 
                    display: "flex",
                    [theme.breakpoints.up('md')]: { flexDirection: "row", justifyContent: "space-between"},
                    [theme.breakpoints.down('md')]: {flexDirection: "column", gap: "0.5rem"}
                    }}
                  >
                  <FormControl sx={{display: "inline-block"}}>
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
                  <RadioButtonsGroup onSubmit={value => setCasesType(value)}/>
                </Box>
                <Map
                  casesType={casesType}
                  countries={mapCountries}
                  center={mapCenter}
                  zoom={mapZoom} />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Page >
    );
}

export default App;