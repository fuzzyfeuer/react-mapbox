import { combineReducers } from 'redux';
import { mapReducer } from './map/MapReducer';

/**
 * Combines the individual reducers into a single reducer function.
 */
export const rootReducer = combineReducers({
    map: mapReducer
});
