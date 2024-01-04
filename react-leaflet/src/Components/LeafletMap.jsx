import React from 'react';
import 'leaflet/dist/leaflet.css';
import '../styles/LeafletMap.css'
import { MapContainer } from 'react-leaflet/MapContainer'
import { Marker, Popup, GeoJSON } from 'react-leaflet';
import distsVak from '../assets/map/districtsVak.geo.json'
import { markers } from '../assets/markers/markers';
import { divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { homeIcon, planeIcon, orgRatIcon } from '../mapFunc/mapIcons.jsx'
import { TroubleshootRounded } from '@mui/icons-material';

export const LeafletMap = () => {

  const maxBounds = [
    [-20.34, 45.64], // Coordonnée Sud-Ouest
    [-19.02, 48.14]  // Coordonnée Nord-Est
  ];


  const handleIcon = (marker) => {
    switch (marker.icon) {
      case 'home':
        return homeIcon
      case 'plane':
        return planeIcon
      case 'orgRat':
        return orgRatIcon
      default:
        return homeIcon
    }
  }

  const onEachDistrict = (district, layer) => {
    const distName = district.properties.ADM2_EN
    layer.bindPopup(distName)
  }

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html:`<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true)
    })
  }

  return (
    <div>
      <MapContainer center={[-19.725, 46.835]} zoom={9} maxZoom={18} scrollWheelZoom={false} maxBounds={maxBounds}
        maxBoundsViscosity={0.80} >
        <GeoJSON data={distsVak.features} onEachFeature={onEachDistrict} />
        <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon} >
          {markers.map((marker) => {
            return <Marker key={markers.indexOf(marker)} position={marker.position} icon={handleIcon(marker)} >
              <Popup>
                {marker.name}
              </Popup>
            </Marker>
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};
