import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style';

const TStyle = (options = {}) => {
    return new Style({
        fill: new Fill({
            color: options.fillColor || 'rgba(255, 255, 255, 0.6)',
        }),
        stroke: new Stroke({
            color: options.strokeColor || '#319FD3',
            width: options.strokeWidth || 1,
        }),
        image: new CircleStyle({
            radius: options.radius || 5,
            fill: new Fill({
                color: options.imageFillColor || '#319FD3',
            }),
            stroke: new Stroke({
                color: options.imageStrokeColor || '#fff',
                width: options.imageStrokeWidth || 1,
            }),
        }),
    });
};

export default TStyle;
