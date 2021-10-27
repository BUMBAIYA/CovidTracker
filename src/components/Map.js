import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import '../css/Map.css';
import { showDataOnMap } from '../utility/utils';
import { ChangeView } from '../utility/changeView';

const Map = ({ countries, casesType, center, zoom }) => {
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
                <ChangeView center={center} zoom={zoom} />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    )
}

export default Map
