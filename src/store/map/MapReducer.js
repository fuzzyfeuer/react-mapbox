import { createReducer } from '@reduxjs/toolkit';
import * as Types from './MapTypes';

/**
 * Reducer: Updates the application state by applying an action.
 *   This reducer stores any values that are input by the user into a map.
 */

const initialState = {
    mapsById: {}
};

const initMapState = (state, mapId) => {
    // initialize the map
    if (!state.mapsById[mapId]) {
        state.mapsById[mapId] = {
            isBusy: false,
            properties: {}
        };
    }
};


/* State Update Methods */

const setProperty = (state, mapId, keyValues) => {
    initMapState(state, mapId);
    Object.assign(state.mapsById[mapId].properties, keyValues);
};


/* Reducers */

/**
 * This uses React Toolkit (the 'createReducer' method), which underneath uses the 'immer'
 * module to allow direct modification/mutation of the state.
 *
 * https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/
 * #simplifying-immutable-updates-with-redux-toolkit
 */
const caseReducers = {
    [Types.SET_VALUE]: (state, action) => {
        const { mapId, propertyName, value } = action.payload;
        setProperty(state, mapId, { [propertyName]: value });
    },
};

export const mapReducer = createReducer(initialState, caseReducers);
