import React, { useCallback, useMemo, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import '../styles/LeafletMap.css'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker, Popup, GeoJSON } from 'react-leaflet';
import distsVak from '../assets/map/districtsVak.geo.json'
import homeIc from '../assets/icons/home.png';
import planeIc from '../assets/icons/plane.png';
import { markers } from '../assets/markers/markers';
import { Icon } from 'leaflet';

export const LeafletMap = () => {

  const homeIcon = new Icon({
    iconUrl: homeIc,
    iconSize: [30, 30]
  })

  const planeIcon = new Icon({
    iconUrl: planeIc,
    iconSize: [30, 30]
  })

  const handleIcon = (marker) => {
    switch (marker.icon) {
      case 'home':
        return homeIcon
      case 'plane':
        return planeIcon
      default:
        return homeIcon
    }
  }

  const onEachDistrict = (district, layer) => {
    const distName = district.properties.ADM2_EN
    layer.bindPopup(distName)
  }

  return (
    <div>
      <MapContainer center={[-19.725, 46.835]} zoom={8} scrollWheelZoom={false} >
        <GeoJSON data={distsVak.features} onEachFeature={onEachDistrict} />
        {markers.map((marker) => {
          return <Marker key={markers.indexOf(marker)} position={marker.position} icon={handleIcon(marker)} >
            <Popup>
              {marker.name}
            </Popup>
          </Marker>
        })}
      </MapContainer>
    </div>
  );
};
