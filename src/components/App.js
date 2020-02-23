import React from 'react';
import Map from './map/Map';
import './App.less';

/**
 *
 */
function App() {
    console.info('App | Starting --------->>');
    return (
        <div className="app-mapbox-test">
            <Map />
        </div>
    );
}

export default App;
