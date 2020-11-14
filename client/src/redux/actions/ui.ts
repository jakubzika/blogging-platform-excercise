import { AppActionType, SET_LOGIN_LOADING_STATE, SET_LOADING_STATE } from './types'
import { LoadingState } from '../../types'
import { UIState } from '../reducers/ui'

export function setLoadingState(loadingState: LoadingState, kind: keyof UIState): AppActionType {
    return {
        type: SET_LOADING_STATE,
        loadingState,
        kind,
    }
}
