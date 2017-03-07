import React from 'react';
import ReactDOM from 'react-dom';
import {
	Provider
} from 'react-redux';
import {
	createStore,
	applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/AppleReducers';
import AppleBasket from './containers/AppleBasket';
const store = createStore(reducers, applyMiddleware(thunk))
ReactDOM.render(
	<Provider store={store}>
		<AppleBasket/>
	</Provider>,
	document.getElementById('container')
);