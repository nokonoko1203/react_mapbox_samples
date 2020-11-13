import * as React from 'react';
import { useEffect, useState } from 'react';
import ReactMapGL, { Layer, NavigationControl, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
};

const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
  latitude: 45.137451890638886,
  longitude: -68.13734351262877,
  zoom: 5,
};

const sampleGeojson: any = {
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

const geojsonLayer = {
  id: 'maine',
  type: 'fill',
  source: sampleGeojson,
  paint: {
    'fill-color': '#088',
    'fill-opacity': 0.8,
  },
};

const PolyTo3dBuilding = () => {
  const [viewport, setViewport] = useState(initialState);

  // resizeイベント発火ごとに画面幅と高さを取得し、ステートを更新
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

  // mapStyleで定義したスタイルを読み込み
  return (
    <ReactMapGL {...viewport} mapStyle={osmStyle} onViewportChange={(nextViewport) => setViewport(nextViewport)}>
      <div style={{ position: 'absolute', right: 0 }}>
        <NavigationControl />
      </div>
      <Source type="geojson" data={sampleGeojson}>
        <Layer {...geojsonLayer} />
      </Source>
      z
    </ReactMapGL>
  );
};

export default PolyTo3dBuilding;
