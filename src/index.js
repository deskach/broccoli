import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import Landing from "./components/langing";
import promise from 'redux-promise';

import 'bootstrap';
import '../style/style.scss';
import 'bootstrap/dist/css/bootstrap.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

export const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <header>Broccoli & Co.</header>
            <div className={'container'}>
                <Landing/>
            </div>
            <footer>&copy; 2017 Broccoli & Co. All rights reserved.</footer>
        </div>
    </Provider>
    , document.querySelector('#root')
);
