import React, { useEffect, useRef } from 'react';
import mapboxgl, { Style } from 'mapbox-gl';
import './index.css';

const mapboxToken: any = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken = mapboxToken;

const mapStyle: Style = {
  version: 8,
  name: 'Dark',
  sources: {
    mapbox: {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-streets-v8',
    },
    overlay: {
      type: 'image',
      url: 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
      coordinates: [
        [-80.425, 46.437],
        [-71.516, 46.437],
        [-71.516, 37.936],
        [-80.425, 37.936],
      ],
    },
  },
  sprite: 'mapbox://sprites/mapbox/dark-v10',
  glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: { 'background-color': '#111' },
    },
    {
      id: 'water',
      source: 'mapbox',
      'source-layer': 'water',
      type: 'fill',
      paint: { 'fill-color': '#2c2c2c' },
    },
    {
      id: 'boundaries',
      source: 'mapbox',
      'source-layer': 'admin',
      type: 'line',
      paint: {
        'line-color': '#797979',
        'line-dasharray': [2, 2, 6, 2],
      },
      filter: ['all', ['==', 'maritime', 0]],
    },
    {
      id: 'overlay',
      source: 'overlay',
      type: 'raster',
      paint: { 'raster-opacity': 0.85 },
    },
    {
      id: 'cities',
      source: 'mapbox',
      'source-layer': 'place_label',
      type: 'symbol',
      layout: {
        'text-field': '{name_en}',
        'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
        'text-size': ['interpolate', ['linear'], ['zoom'], 4, 9, 6, 12],
      },
      paint: {
        'text-color': '#969696',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(0, 0, 0, 0.85)',
      },
    },
    {
      id: 'states',
      source: 'mapbox',
      'source-layer': 'place_label',
      type: 'symbol',
      layout: {
        'text-transform': 'uppercase',
        'text-field': '{name_en}',
        'text-font': ['DIN Offc Pro Bold', 'Arial Unicode MS Bold'],
        'text-letter-spacing': 0.15,
        'text-max-width': 7,
        'text-size': ['interpolate', ['linear'], ['zoom'], 4, 10, 6, 14],
      },
      filter: ['==', ['get', 'class'], 'state'],
      paint: {
        'text-color': '#969696',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(0, 0, 0, 0.85)',
      },
    },
  ],
};

const Map = () => {
  const mapContainerRef: any = useRef(null);

  const lng = -75.789;
  const lat = 41.874;
  const zoom = 5;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      maxZoom: 5.99,
      minZoom: 4,
      style: mapStyle,
      center: [lng, lat],
      zoom: zoom,
    });

    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;
