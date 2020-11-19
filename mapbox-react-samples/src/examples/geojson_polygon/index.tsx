import React, { useEffect, useRef } from 'react';
import mapboxgl, { Style } from 'mapbox-gl';
import './index.css';

const osmStyle: Style = {
  version: 8,
  sources: {
    'osm-tiles': {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', 'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
    },
  },
  layers: [
    {
      id: 'osm-tiles-layer',
      type: 'raster',
      source: 'osm-tiles',
      minzoom: 0,
      maxzoom: 22,
    },
  ],
};

const sampleData: any = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-67.13734351262877, 45.137451890638886],
        [-66.96466, 44.8097],
        [-68.03252, 44.3252],
        [-69.06, 43.98],
        [-70.11617, 43.68405],
        [-70.64573401557249, 43.090083319667144],
        [-70.75102474636725, 43.08003225358635],
        [-70.79761105007827, 43.21973948828747],
        [-70.98176001655037, 43.36789581966826],
        [-70.94416541205806, 43.46633942318431],
        [-71.08482, 45.3052400000002],
        [-70.6600225491012, 45.46022288673396],
        [-70.30495378282376, 45.914794623389355],
        [-70.00014034695016, 46.69317088478567],
        [-69.23708614772835, 47.44777598732787],
        [-68.90478084987546, 47.184794623394396],
        [-68.23430497910454, 47.35462921812177],
        [-67.79035274928509, 47.066248887716995],
        [-67.79141211614706, 45.702585354182816],
        [-67.13734351262877, 45.137451890638886],
      ],
    ],
  },
};

const sampleSource: any = {
  type: 'geojson',
  data: sampleData,
};

const sampleLayer: any = {
  id: 'maine',
  type: 'fill',
  source: sampleSource,
  layout: {},
  paint: {
    'fill-color': '#088',
    'fill-opacity': 0.8,
  },
};

const Map = () => {
  const mapContainerRef: any = useRef(null);

  const lng = -68.13734351262877;
  const lat = 45.137451890638886;
  const zoom = 5;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: osmStyle,
      center: [lng, lat],
      zoom: zoom,
    });

    map.on('load', () => {
      map.addLayer(sampleLayer);
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
