import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as L from 'leaflet';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { key, image } from '@configs';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const MapRouting = ({ position, positionCust }) => {
  const map = useMap();

  const markerTechnician = L.icon({
    iconUrl: image.riderBlue,
    iconSize: [22, 40],
    iconAnchor: [11, 20],
  });

  const markerCust = L.icon({
    iconUrl: image.marker,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  L.marker(position, { icon: markerTechnician }).addTo(map);
  L.marker(positionCust, { icon: markerCust }).addTo(map);

  useEffect(() => {
    const control = L.Routing.control({
      draggableWaypoints: false,
      waypoints: [position, positionCust],
      show: false,
      router: L.Routing.mapbox(`${key.mapboxAccessToken}`, {}),
      lineOptions: {
        extendToWaypoints: true,
        missingRouteTolerance: 1,
        styles: [
          {
            color: 'black',
            opacity: 0.2,
            weight: 10,
          },
          {
            color: '#2E9AFE',
            opacity: 20,
            weight: 4,
          },
        ],
        missingRouteStyles: [
          {
            color: 'black',
            opacity: 0.2,
            weight: 10,
          },
          {
            color: 'white',
            opacity: 0.6,
            weight: 4,
          },
          {
            color: 'gray',
            opacity: 10,
            weight: 2,
            dashArray: '7,12',
          },
        ],
        addWaypoints: false,
      },
      useZoomParameter: true,
      showAlternatives: true,
    }).addTo(map);

    return () => {
      map.removeControl(control);
    };
  }, [position, positionCust]);

  return null;
};

export default function Component(props) {
  const { lat, lon, zoom, scroll, latCust, lonCust } = props;

  const position = new L.LatLng(lat, lon);
  const positionCust = new L.LatLng(Number(latCust), Number(lonCust));

  return (
    <MapContainer
      center={position}
      scrollWheelZoom={scroll}
      style={{ width: '100%', height: '100%' }}
      zoom={zoom}
    >
      <MapRouting position={position} positionCust={positionCust} />
      <TileLayer
        attribution='MyCarrier - Map data &copy; <a href="https://www.openstreetmap.org/">
                    OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">
                    CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?access_token=${key.mapboxAccessToken}`}
      />
    </MapContainer>
  );
}

Component.defaultProps = {
  lat: 0,
  latCust: 0,
  lon: 0,
  lonCust: 0,
  scroll: false,
  zoom: 13,
};

Component.propTypes = {
  lat: PropTypes.number,
  latCust: PropTypes.number,
  lon: PropTypes.number,
  lonCust: PropTypes.number,
  scroll: PropTypes.bool,
  zoom: PropTypes.number,
};
