import { combineReducers } from 'redux'

import appReducer from './app'
import authReducer from './auth'

const reducer = combineReducers({
    app: appReducer,
    auth: authReducer,
})

export type AppState = ReturnType<typeof reducer>

export default reducer
