import { createStore } from 'redux';
import { rootReducer } from './RootReducer';

/**
 * The Redux store that holds the complete state tree for the app.
 */
export const reduxStore = createStore(rootReducer);
