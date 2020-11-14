import { combineReducers } from 'redux'

import appReducer from './app'
import authReducer from './auth'
import uiReducer from './ui'

const reducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    ui: uiReducer,
})

export type AppState = ReturnType<typeof reducer>

export default reducer
