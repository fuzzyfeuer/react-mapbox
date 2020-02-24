import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import exampleGeoJson from 'geojson/example-cables-geo.json';
import MapInfo from './MapInfo';
import './Map.less';

// Map current position/zoom.
const initalValues = {
    /* Bath */
    /*
    lat: 51.38,
    lng: -2.36,
    zoom: 14
    */

    /* North Scotland */
    lat: 58.99,
    lng: -2.94,
    zoom: 8
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

        // create the map
        const mbMap = new mapboxgl.Map({
            container: mapDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [values.lng, values.lat],
            zoom: values.zoom
        });
        setMap(mbMap);

        // move handler: update coordinates in store.
        mbMap.on('move', () => {
            const pos = mbMap.getCenter();
            const zoom = mbMap.getZoom();

            //console.debug(`Map | Move lat,lng=(${pos.lat.toFixed(4)},${pos.lng.toFixed(4)}) ` +
            //              `zoom=${zoom.toFixed(2)}`);
            setValues({
                lat: pos.lat,
                lng: pos.lng,
                zoom
            });
        });

        // load geojson
        mbMap.on('load', () => {
            const cableSourceId = 'src:cableLines';
            const cableLayerId = 'layer:cableLines';

            mbMap.addControl(new mapboxgl.NavigationControl());

            const mapSource = {
                type: 'geojson',
                data: exampleGeoJson
            };
            mbMap.addSource(cableSourceId, mapSource);

            const baseWidth = 2;
            const baseZoom = 6;

            mbMap.addLayer({
                id: cableLayerId,
                type: 'line',
                source: cableSourceId,
                paint: {
                    // Use a get expression (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
                    // to set the line-color to a feature property value.
                    'line-color': ['get', 'color'],
                    'line-opacity': 0.8,
                    // 'line-width': 5

                    // Change the line width with the zoom level.
                    // https://gis.stackexchange.com/questions/259407/
                    //   style-line-width-proportionally-to-maintain-relative-size-in-mapbox-gl
                    'line-width': {
                        type: 'exponential',
                        base: 2,
                        stops: [
                            [0, baseWidth * (2 ** (0 - baseZoom))],
                            [24, baseWidth * (2 ** (24 - baseZoom))]
                        ]
                    }
                },
                layout: {
                    'line-cap': 'butt',    // 'round'
                    'line-join': 'round'   // 'miter'
                }
            });


            // mouse click
            mbMap.on('mouseup', (e) => {    // mousedown, mouseup, click
                console.info(`e.point: ${JSON.stringify(e.point)}`);

                const offset = 8;
                const pointBox = [
                    [e.point.x - offset, e.point.y - offset],
                    [e.point.x + offset, e.point.y + offset]
                ];

                const features = mbMap.queryRenderedFeatures(/*e.point*/ pointBox, {
                    layers: [cableLayerId]
                });
                console.info(`Click: ${features.length}`);

                features.forEach((f) => {
                    if (f && f.layer && f.properties) {
                        console.info(`Feature: ${f.layer.id} | ${f.properties.slug}`);
                    }
                });
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
