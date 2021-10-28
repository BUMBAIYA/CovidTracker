import React from 'react';
import numeral from "numeral";
import { Circle, Popup } from 'react-leaflet';

const casesTypeColors = {
    cases: {
        hex: "#fb4443",
        rgb: "rgb(204, 16, 52)",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 220,
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 200,
    },
    deaths: {
        hex: "#fb4443",
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 1300,
    },
};

export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) => (
    stat ? `+${numeral(stat).format("0.0a")}` : "+0"
);

export const showDataOnMap = (data, casesType = "cases") => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            pathOptions={{
                color: casesTypeColors[casesType].hex,
                fillColor: casesTypeColors[casesType].hex
            }}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className="popup__container">
                    <div className="popup__flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
                    <div className="popup__name" >{country.country}</div>
                    <div className="popup__cases" >Cases : <strong>{numeral(country.cases).format("0,0")}</strong></div>
                    <div className="popup__recovered" >Recovered : <strong>{numeral(country.recovered).format("0,0")}</strong></div>
                    <div className="popup__deaths" >Deaths : <strong>{numeral(country.deaths).format("0,0")}</strong></div>
                </div>
            </Popup>
        </Circle>
    ))
)