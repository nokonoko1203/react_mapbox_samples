import * as React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { Layer, NavigationControl, Source } from 'react-map-gl';
import { useEffect, useState } from 'react';

const osmStyle = {
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

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
  latitude: 37.8,
  longitude: -96,
  zoom: 3,
};

const sampleSource: any = {
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
        icon: 'monument',
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
        icon: 'harbor',
      },
    },
  ],
};

const sampleLayer: any = {
  id: 'points',
  type: 'symbol',
  layout: {
    'icon-image': ['concat', ['get', 'icon'], '-15'],
    'text-field': ['get', 'title'],
    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
    'text-offset': [0, 0.6],
    'text-anchor': 'top',
  },
};

// const sampleLayerCircle: any = {
//   id: 'points',
//   type: 'circle',
//   paint: {
//     'circle-color': '#a40000',
//     'circle-radius': 50,
//     'circle-opacity': 1.0,
//   },
// };

const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

const SampleMapView = () => {
  const [viewport, setViewport] = useState(initialState);

  useEffect(() => {
    const handleResize = () => {
      setViewport((v) => {
        return {
          ...v,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ReactMapGL
      mapboxApiAccessToken={mapboxToken}
      {...viewport}
      mapStyle={osmStyle}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <div style={{ position: 'absolute', right: 0 }}>
        <NavigationControl />
      </div>
      <Source type="geojson" data={sampleSource}>
        <Layer {...sampleLayer} />
      </Source>
    </ReactMapGL>
  );
};
export default SampleMapView;
