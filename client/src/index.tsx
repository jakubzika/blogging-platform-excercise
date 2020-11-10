import { createStore,applyMiddleware, compose } from 'redux'
import {render} from 'react-dom'
import React from 'react'
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'

const style = require('./assets/styles/main.scss')

import reducer from './redux/reducers/index'
import { Provider } from 'react-redux'

import App from './containers/app'

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,composeEnhancers(applyMiddleware(thunk)),)

const renderApp = () => {
    render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,document.getElementById('root')
    )
}

renderApp()