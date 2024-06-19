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
import TStyle from './TDotStyle';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import TLineStyle from './TLineStyle';
//ol-ext
import 'ol-ext/dist/ol-ext.css';
import Chart from 'ol-ext/style/Chart';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';


const generateRandomPointsGeoJSON = (numPoints, extent) => {
    const features = [];
    for (let i = 0; i < numPoints; i++) {
        const coords = [
            Math.random() * (extent[2] - extent[0]) + extent[0],
            Math.random() * (extent[3] - extent[1]) + extent[1]
        ];
        features.push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: coords
            },
            properties: {
                name: `Point ${i + 1}`
            }
        });
    }
    return {
        type: 'FeatureCollection',
        features: features
    };
};

const extent = [-50.3264 - 5, -27.8167 - 5, -50.3264 + 5, -27.8167 + 5];
const randomPointsGeoJSON = generateRandomPointsGeoJSON(1000, extent);

const generateRandomLinesGeoJSON = (numLines, extent) => {
    const features = [];
    for (let i = 0; i < numLines; i++) {
        const coords = [
            [Math.random() * (extent[2] - extent[0]) + extent[0], Math.random() * (extent[3] - extent[1]) + extent[1]],
            [Math.random() * (extent[2] - extent[0]) + extent[0], Math.random() * (extent[3] - extent[1]) + extent[1]]
        ];
        features.push({
            type: 'Feature',
            geometry: {
                type: 'LineString',
                coordinates: coords
            },
            properties: {
                name: `Line ${i + 1}`
            }
        });
    }
    return {
        type: 'FeatureCollection',
        features: features
    };
};

const extentLines = [-50.3264 - 5, -27.8167 - 5, -50.3264 + 5, -27.8167 + 5];
const randomLinesGeoJSON = generateRandomLinesGeoJSON(1000, extentLines);

const MapComponent = () => {
    const mapRef = useRef();
    const map = useRef();
    const [popups, setPopups] = useState([]);

    //    Features
    const pointSourceRef = useRef(new VectorSource({
        features: new GeoJSON().readFeatures(randomPointsGeoJSON, {
            featureProjection: 'EPSG:3857',
        }),
    }));

    const lineSourceRef = useRef(new VectorSource({
        features: new GeoJSON().readFeatures(randomLinesGeoJSON, {
            featureProjection: 'EPSG:3857',
        }),
    }));

    const pointLayerRef = useRef(new VectorLayer({
        source: pointSourceRef.current,
        style: TStyle(),
    }));

    const lineLayerRef = useRef(new VectorLayer({
        source: lineSourceRef.current,
        style: TLineStyle(),
    }));

    //    Chart extension
    // const pointLayerRef = useRef(new VectorLayer({
    //     source: pointSourceRef.current,
    //     style: function(feature) {
    //         return new Style({
    //             image: new Chart({
    //                 type: 'pie',
    //                 radius: 15,
    //                 data: [Math.random() * 20, Math.random() * 30, Math.random() * 40],
    //                 colors: ['#FFC0CB', '#90EE90', '#ADD8E6'],
    //                 stroke: new Stroke({
    //                     color: '#000000',
    //                     width: 2
    //                 }),
    //                 fill: new Fill({
    //                     color: 'rgba(255, 255, 255, 0.8)'
    //                 })
    //             })
    //         });
    //     }
    // }));

    useEffect(() => {
        map.current = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                // pointLayerRef.current,
                // lineLayerRef.current,
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
        } else if (mapDiv.webkitRequestFullscreen) {
            mapDiv.webkitRequestFullscreen();
        } else if (mapDiv.msRequestFullscreen) {
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
                    <PopupPopover popups={popups} setPopups={setPopups} />
                </Grid>
                <Grid item>
                    <Fab color="primary" aria-label="fullscreen" onClick={handleFullScreen}>
                        <FullscreenIcon />
                    </Fab>
                </Grid>
            </Grid>

            <Grid container spacing={1} style={{ position: 'absolute', bottom: '30px', right: '20px', flexDirection: 'row-reverse' }}>
                <Grid item>
                    <TableBottomBar />
                </Grid>
            </Grid>
        </div>
    );
};

export default MapComponent;
