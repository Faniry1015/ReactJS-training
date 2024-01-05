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
import { Box, Button } from '@mui/material';
import { LocationMarker } from './LocationMarker.jsx';
import { stakeholdersData } from '../assets/data/stakeholdersData.jsx';
import { stakeholdersPerCommune } from '../functions/dataFunc.jsx';

export const LeafletMap = () => {
  const projectList = []
  Object.entries(stakeholdersData).forEach(([key, value]) => {
    projectList.push(key)
  })

  const [currentDistrict, setCurrentDistrict] = useState('')
  const [currentProjectZone, setCurrentProjectZone] = useState({
    project: 'all',
    zone: ['Betafo', 'Antsirabe II', 'Antsirabe I', 'Faratsiho', 'Ambatolampy', 'Antanifotsy', 'Mandoto'],
    index: 0
  })
  const mapRef = useRef(null)

  const maxBounds = [
    [-20.34, 45.64], // Coordonnée Sud-Ouest
    [-19.02, 48.14]  // Coordonnée Nord-Est
  ];
  const handleResetMap = () => {
    mapRef.current.setView([-19.725, 46.835], 8);
  };


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

  const showInterventionZone = (e) => {
    let index = currentProjectZone.index
    const project = e.target.value
    setCurrentProjectZone({
      project: project,
      zone: stakeholdersData[project],
      index: ++index
    })
  }

  const onEachDistrict = (district, layer) => {
    const zone = district.properties.ADM2_EN;
    if (currentProjectZone.zone.includes(zone)) {
      layer.setStyle({ fillColor: 'green', fillOpacity: 0.7 });
    } else {
      layer.setStyle({ fillColor: 'grey', fillOpacity: 0.5 });
    }
    const distName = district.properties.ADM2_EN
    // layer.bindPopup(distName)
    layer.on({
      click: () => {
        setCurrentDistrict(distName);
      },
    });
  }

  const heatMap = () => {

  }

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true)
    })
  }

  return (
    <Box>
      {JSON.stringify(stakeholdersPerCommune)}
      <Button onClick={handleResetMap}>Rétablir la carte</Button> <Button onClick={heatMap}>HeatMap des interventions</Button>
      <br />
      {projectList.map((project) => {
        return <Button key={projectList.indexOf(project)} onClick={showInterventionZone} value={project}>{project}</Button>
      })}
      <MapContainer center={[-19.725, 46.835]} zoom={8} maxZoom={18} maxBounds={maxBounds}
        maxBoundsViscosity={0.80} ref={mapRef}>
        <GeoJSON key={currentProjectZone.index} data={communeVakMap.features} onEachFeature={onEachDistrict} />
        <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon} disableClusteringAtZoom={12}>
          {markers.map((marker) => {
            return <Marker key={markers.indexOf(marker)} position={marker.position} icon={handleIcon(marker)} >
              <Popup>
                {marker.name}
              </Popup>
            </Marker>
          })}
          {/* <LocationMarker /> */}
        </MarkerClusterGroup>
      </MapContainer>
    </Box>
  );
};
