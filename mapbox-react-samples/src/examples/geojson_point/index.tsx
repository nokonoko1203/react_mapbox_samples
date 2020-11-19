import React, { useEffect, useRef } from 'react';
import mapboxgl, { Style } from 'mapbox-gl';
import './index.css';
import mySvg from './assets/map-marker-alt.svg';

const mapboxToken: any = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken = mapboxToken;

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
  glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
};

const sampleData: any = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.03238901390978, 38.913188059745586],
      },
      properties: {
        title: 'Mapbox DC',
      },
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776],
      },
      properties: {
        title: 'Mapbox SF',
      },
    },
  ],
};

const sampleSource: any = {
  type: 'geojson',
  data: sampleData,
};

const sampleLayer: any = {
  id: 'points',
  type: 'symbol',
  source: sampleSource,
  layout: {
    'icon-image': 'sampleMarker',
    'text-field': ['get', 'title'],
    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    'text-offset': [0, 0.6],
    'text-anchor': 'top',
  },
};

const sampleMarker: any = new Image(30, 40);
sampleMarker.src = mySvg;

const Map = () => {
  const mapContainerRef: any = useRef(null);

  const lng = -96;
  const lat = 37.8;
  const zoom = 3;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: osmStyle,
      center: [lng, lat],
      zoom: zoom,
    });

    map.on('load', () => {
      map.addImage('sampleMarker', sampleMarker);
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
