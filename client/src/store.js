import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Setting up redux store, middleware thunk and compose to include redux devtools
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

console.log(`%c INITIAL REDUX STORE`, 'color: purple', store.getState());

export default store;
