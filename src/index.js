import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers';
import Survey from "./components/survey";
import promise from 'redux-promise';

import 'bootstrap';
import '../style/style.scss';
import 'bootstrap/dist/css/bootstrap.css';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <div className={'container'}>
            <header>Broccoli & Co.</header>
            <Survey/>
            <footer>&copy; 2017 Broccoli & Co. All rights reserved.</footer>
        </div>
    </Provider>
    , document.querySelector('#root')
);
