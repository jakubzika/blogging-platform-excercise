import { State } from '../../types'
import { AppActionType, TESTING_ACTION } from '../actions/types'

const initialState: State = {
    articles: [],
    users: [],
    loading: false,
    message: '',
}

export default function appReducer(state: State = initialState, action: AppActionType): State {
    switch (action.type) {
        case TESTING_ACTION:
            return {
                ...state,
                message: action.payload,
            }
        default:
            return state
    }
}
