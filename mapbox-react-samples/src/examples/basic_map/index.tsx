import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { Style } from 'mapbox-gl';
import './index.css';

// const mapboxToken: any = process.env.REACT_APP_MAPBOX_TOKEN;
// mapboxgl.accessToken = mapboxToken;

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

const Map = () => {
  const mapContainerRef: any = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // style: 'mapbox://styles/mapbox/streets-v11',
      style: osmStyle,
      center: [lng, lat],
      zoom: zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      const nowLng = map.getCenter().lng.toFixed(4);
      const nowLat = map.getCenter().lat.toFixed(4);
      const nowZoom = map.getZoom().toFixed(2);
      setLng(Number(nowLng));
      setLat(Number(nowLat));
      setZoom(Number(nowZoom));
    });

    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="sidebarStyle">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;
