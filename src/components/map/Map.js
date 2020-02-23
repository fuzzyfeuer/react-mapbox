import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapInfo from './MapInfo';
import './Map.less';

// Map current position/zoom.
const initalValues = {
    lat: 51.38,
    lng: -2.36,
    zoom: 14
};

/**
 *
 */
function Map() {
    const [map, setMap] = useState(null);
    const [values, setValues] = useState(initalValues);
    const mapDiv = useRef(null);

    const prepareMapbox = () => {
        console.info('Map | Preparing Mapbox.');
        const mbMap = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [values.lng, values.lat],
            zoom: values.zoom
        });
        setMap(mbMap);

        mbMap.on('move', () => {
            const pos = mbMap.getCenter();
            const zoom = mbMap.getZoom();

            console.debug(`Map | Move lat,lng=(${pos.lat.toFixed(4)},${pos.lng.toFixed(4)}) ` +
                          `zoom=${zoom.toFixed(2)}`);
            setValues({
                lng: pos.lng.toFixed(4),
                lat: pos.lat.toFixed(4),
                zoom: zoom.toFixed(2)
            });
        });
    };

    useEffect(() => {
        prepareMapbox();
    }, []);  // called once after first render (componentDidMount).

    return (
        <div className="ff-map-container">
            <MapInfo values={values} />
            <div className="ff-map" ref={mapDiv} />
        </div>
    );
}

export default Map;
