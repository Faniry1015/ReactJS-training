import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import '../styles/LeafletMap.css'
import { MapContainer } from 'react-leaflet/MapContainer'
import { Marker, Popup, GeoJSON, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import communeVakMap from '../assets/map/communeVak.geo.json'
import { markers } from '../assets/markers/markers';
import { divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { homeIcon, planeIcon, orgRatIcon } from '../mapFunc/mapIcons.jsx'
import { maxBounds } from '../assets/data/mapDefaultParams.jsx';
import { mapCenter } from '../assets/data/mapDefaultParams.jsx';
import { zoomParams } from '../assets/data/mapDefaultParams.jsx';
import { Box, Button } from '@mui/material';
import { LocationMarker } from './LocationMarker.jsx';
import { stakeholdersData } from '../assets/data/stakeholdersData.jsx';
import { stakeholdersPerCommune } from '../functions/dataFunc.jsx';
import { actualStakeholdersPerCommune } from '../functions/dataFunc.jsx';

export const LeafletMap = () => {

  const [currentCommune, setCurrentCommune] = useState('')
  const [state, setState] = useState({
    activeStakeholders: actualStakeholdersPerCommune,
    refreshKey: 0
  })
  const { activeStakeholders, refreshKey } = state

  const mapRef = useRef(null)

  const handleResetMap = () => {
    mapRef.current.setView(mapCenter, zoomParams.zoom);
  };

  const stakeholdersList = []
  for (const [key, value] of Object.entries(stakeholdersData)) {
    stakeholdersList.push(key)
  }

  const showActiveStakeholderArea = (e) => {
    const activeStakeholderCommune = {};
    const stakeholderValue = e.target.value;
  
    for (const [district, communes] of Object.entries(stakeholdersPerCommune)) {
      for (const [commune, stakeholders] of Object.entries(communes)) {
        if (stakeholders.includes(stakeholderValue)) {
          if (!activeStakeholderCommune[district]) {
            activeStakeholderCommune[district] = {};
          }
  
          activeStakeholderCommune[district][commune] = [...(activeStakeholderCommune[district][commune] || []), stakeholderValue];
        }
      }
    }
    let currentRefreshKey = refreshKey
    setState({activeStakeholders: activeStakeholderCommune, refreshKey: ++currentRefreshKey})

  };

  const heatMap = () => {

  }
  

  const onEachCommune = (area, layer) => {
    const currentDistrict = area.properties.ADM2_EN
    const currentCommune = area.properties.ADM3_EN;
    const stakeholdersDistrict = activeStakeholders[currentDistrict]
    console.log(activeStakeholders)
    if (stakeholdersDistrict && stakeholdersDistrict.hasOwnProperty(currentCommune) && stakeholdersDistrict[currentCommune].length > 0) {
      console.log(activeStakeholders)
      layer.setStyle({ fillColor: 'green', fillOpacity: 0.6 });
    }
    layer.bindPopup(currentCommune)
    layer.on({
      click: () => {
        setCurrentCommune(currentCommune);
      },
    });
  }

  const { zoom, maxZoom, minZoom } = zoomParams
  return (
    <Box>
      {JSON.stringify(activeStakeholders)}
      <Button onClick={handleResetMap}>Rétablir la carte</Button> <Button onClick={heatMap}>HeatMap des interventions</Button>
      <br />
      {stakeholdersList.map((stakeholder) => {
        return <Button key={stakeholdersList.indexOf(stakeholder)} onClick={showActiveStakeholderArea} value={stakeholder}>{stakeholder}</Button>
      })}
      <MapContainer center={mapCenter} zoom={zoom} maxZoom={maxZoom} minZoom={minZoom} maxBounds={maxBounds}
        maxBoundsViscosity={0.80} ref={mapRef}>
        <GeoJSON key={refreshKey} data={communeVakMap.features} onEachFeature={onEachCommune} />
      </MapContainer>
    </Box>
  );
};
