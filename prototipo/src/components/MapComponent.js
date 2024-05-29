import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Button, Grid } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Fab from '@mui/material/Fab';
import { fromLonLat } from 'ol/proj';
import Tree from './Tree'
import TreeIcon from '@mui/icons-material/AccountTree';

const MapComponent = () => {
  const mapRef = useRef();
  const map = useRef();
//   const [treeVisible, setTreeVisible] = useState(false);


  useEffect(() => {
    map.current = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([-50.3264, -27.8167]), 
        zoom: 8,
      }),
      controls: [],
    });

    return () => {
      map.current.setTarget(null);
    };
  }, []);

  const handleZoomIn = () => {
    const view = map.current.getView();
    const zoom = view.getZoom();
    view.setZoom(zoom + 1);
  };

  const handleZoomOut = () => {
    const view = map.current.getView();
    const zoom = view.getZoom();
    view.setZoom(zoom - 1);
  };

  const handleFullScreen = () => {
    const mapDiv = mapRef.current;
    if (mapDiv.requestFullscreen) {
      mapDiv.requestFullscreen();
    } else if (mapDiv.webkitRequestFullscreen) { /* Safari */
      mapDiv.webkitRequestFullscreen();
    } else if (mapDiv.msRequestFullscreen) { /* IE11 */
      mapDiv.msRequestFullscreen();
    }
  };

//   const handleOpenTree = () => {
//     setTreeVisible(true);
//   };
  
//   const handleCloseTree = () => {
//     setTreeVisible(false);
//   };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      <Grid container spacing={2} style={{ position: 'absolute', top: '20px', left: '20px' }}>
        <Grid item>
          <Fab color="primary" aria-label="zoom-in" onClick={handleZoomIn}>
            <ZoomInIcon />
          </Fab>
        </Grid>
</Grid>
      <Grid container spacing={2} style={{ position: 'absolute', top: '70px', left: '20px', marginTop: '0px' }}>
        <Grid item>
          <Fab color="primary" aria-label="zoom-out" onClick={handleZoomOut}>
            <ZoomOutIcon />
          </Fab>
        </Grid>
      </Grid>
      <div style={{ position: 'absolute', top: '20px', right: '30px' }}>
        <Fab color="primary" aria-label="fullscreen" onClick={handleFullScreen}>
          <FullscreenIcon />
        </Fab>
      </div>
</div>
  );
};

export default MapComponent;