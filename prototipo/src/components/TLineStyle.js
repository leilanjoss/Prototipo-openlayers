import { Style, Stroke } from 'ol/style';

const TLineStyle = (options = {}) => {
    return new Style({
        stroke: new Stroke({
            color: options.strokeColor || '#319FD3',
            width: options.strokeWidth || 2
        })
    });
};

export default TLineStyle;
