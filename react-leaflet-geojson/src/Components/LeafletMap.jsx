import React, { useCallback, useMemo, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker, Popup, GeoJSON } from 'react-leaflet';
import distsVak from '../assets/map/districtsVak.geo.json'

export const LeafletMap = () => {

  const randomColorPicker = ['green', 'bleu', 'grey', 'red', 'brown', 'pink']

  const [state, setState] = useState({color: "#556633"})

  const handleLayerColor = (e) => {
    setState({ color: e.target.value })
  }

  const handleDistrictClick = (e) => {
    e.target.setStyle({
      fillOpacity: 1,
      fillColor: state.color, //ne marche pas pour l'instant
      color: 'red',
    })
  }

  const onEachDistrict = (district, layer) => {
    const distName = district.properties.ADM2_EN
    layer.bindPopup(distName) //Un popup du nom du district qui apparait au click

    const colorIndex = Math.floor((Math.random() * randomColorPicker.length))
    layer.options.fillColor = randomColorPicker[colorIndex] //Add random color to each layer

    layer.on({
      click: handleDistrictClick 
    })
  }

  return (
    <div>
    {JSON.stringify(state.color)}
      <MapContainer center={[-19.725, 46.835]} zoom={8} scrollWheelZoom={false} style={{ height: '80vh' }}>
        <GeoJSON data={distsVak.features} onEachFeature={onEachDistrict} />
      </MapContainer>
      <input type='color' value={state.color} onChange={handleLayerColor} />
    </div>
  );
};
