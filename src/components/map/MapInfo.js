import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 */
function MapInfo({ values }) {
    const { lat, lng, zoom } = values;

    return (
        <div className="ff-map-info">
            (Lat <span>{lat.toFixed(4)}</span>,&nbsp;
            Long <span>{lng.toFixed(4)}</span>)&nbsp;
            Zoom <span>{zoom.toFixed(4)}</span>
        </div>
    );
}

MapInfo.propTypes = {
    // View related settings for the map.
    values: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired
    }).isRequired
};

export default MapInfo;
