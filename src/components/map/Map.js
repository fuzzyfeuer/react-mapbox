import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import exampleCablesGeo from 'geojson/example-cables-geo.json';
import exampleLandingGeo from 'geojson/example-landing-points-geo.json';
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

        //const styleUrl = 'mapbox://styles/mapbox/streets-v11';
        const styleUrl = 'mapbox://styles/fuzzyfeuer/ck7253a9i10yk1iqwwak1tusc';

        // create the map
        const mbMap = new mapboxgl.Map({
            container: mapDiv.current,
            style: styleUrl,
            center: [values.lng, values.lat],
            zoom: values.zoom,
            antialias: true
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
            const landingSourceId = 'src:landingPoints';
            const landingLayerId = 'layer:landingPoints';

            mbMap.addControl(new mapboxgl.NavigationControl());

            const mapSource1 = {
                type: 'geojson',
                data: exampleCablesGeo
            };
            mbMap.addSource(cableSourceId, mapSource1);

            const mapSource2 = {
                type: 'geojson',
                data: exampleLandingGeo
            };
            mbMap.addSource(landingSourceId, mapSource2);

            //const baseWidth = 2;
            //const baseZoom = 6;

            mbMap.addLayer({
                id: cableLayerId,
                type: 'line',
                source: cableSourceId,
                paint: {
                    // Use a get expression (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
                    // to set the line-color to a feature property value.
                    'line-color': ['get', 'color'],
                    'line-opacity': 0.8,
                    'line-width': 5

                    // Change the line width with the zoom level.
                    // https://gis.stackexchange.com/questions/259407/
                    //   style-line-width-proportionally-to-maintain-relative-size-in-mapbox-gl
                    //'line-width': {
                    //    type: 'exponential',
                    //    base: 2,
                    //    stops: [
                    //        [0, baseWidth * (2 ** (0 - baseZoom))],
                    //        [24, baseWidth * (2 ** (24 - baseZoom))]
                    //    ]
                    //}
                },
                layout: {
                    'line-cap': 'butt',    // 'round'
                    'line-join': 'round'   // 'miter'
                }
            });

            mbMap.addLayer({
                id: landingLayerId,
                type: 'circle',
                source: landingSourceId,
                minzoom: 5,
                paint: {
                    // make circles larger as the user zooms from z12 to z22
                    //'circle-radius': {
                    //    base: 4,
                    //    stops: [[2, 4], [12, 128]]
                    //},
                    'circle-radius': 4,
                    'circle-color': '#f0f0f0',
                    'circle-opacity': 0.8,
                    'circle-stroke-width': 1.5,
                    'circle-stroke-color': '#0a0a0a'
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
                    layers: [landingLayerId, cableLayerId]
                });
                console.info(`Click: ${features.length}`);

                // TODO - remove duplicate features !

                features.forEach((f) => {
                    if (f && f.layer && f.properties) {
                        console.info(`Feature: ${f.layer.id} | ${f.properties.id} | ${f.properties.name}`);
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
