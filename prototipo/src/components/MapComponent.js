import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Grid } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Fab from '@mui/material/Fab';
import { fromLonLat } from 'ol/proj';
import PopupPopover from './PopupPopover';
import TreePopover from './TreePopover';
import TableBottomBar from './TableBottomBar';

const MapComponent = () => {
    const mapRef = useRef();
    const map = useRef();
    

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

    
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

      <Grid container spacing={2} style={{ position: 'absolute', top: '20px', left: '20px', flexDirection: 'column' }}>
        <Grid item>
            <Fab color="primary" aria-label="zoom-in" onClick={handleZoomIn}>
                <ZoomInIcon />
            </Fab>
        </Grid>
        <Grid item>
            <Fab color="primary" aria-label="zoom-out" onClick={handleZoomOut}>
                <ZoomOutIcon />
            </Fab>
        </Grid>
      </Grid>
      
      <Grid container spacing={2} style={{ position: 'absolute', top: '20px', right: '20px', flexDirection: 'row-reverse' }}>
            <Grid item>
                <TreePopover />
            </Grid>
            <Grid item>
                <PopupPopover />
            </Grid>
            <Grid item>
                <Fab color="primary" aria-label="fullscreen" onClick={handleFullScreen}>
                    <FullscreenIcon />
                </Fab>
            </Grid>
        </Grid>

        <Grid container spacing={1} style={{ position: 'absolute', bottom: '30px', right: '20px', flexDirection: 'row-reverse'}}>
                <Grid item>
                    <TableBottomBar/>
                </Grid>
        </Grid>

    </div>
  );

};

export default MapComponent;
