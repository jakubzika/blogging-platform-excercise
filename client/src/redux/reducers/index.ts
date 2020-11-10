import { combineReducers } from 'redux'

import appReducer from './app'

const reducer = combineReducers({
    app: appReducer,
})

export type AppState = ReturnType<typeof reducer>

export default reducer
