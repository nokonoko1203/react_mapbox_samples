import * as React from 'react';
import { useEffect, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// スタイルでOSMを定義
const OSM_STYLE = {
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
      id: 'simple-tiles',
      type: 'raster',
      source: 'osm-tiles',
      minzoom: 0,
      maxzoom: 22,
    },
  ],
};

const App = () => {
  // stateとして描画位置を定義
  // width,heightはnumber型なので'100vh'とか使えない
  // window関数で現在の描画幅などを取得してくる
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 43.068564,
    longitude: 141.3507138,
    zoom: 8,
  });

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
    <ReactMapGL
      {...viewport}
      mapStyle={OSM_STYLE}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    ></ReactMapGL>
  );
};

export default App;
