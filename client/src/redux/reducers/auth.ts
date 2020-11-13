import { User, UserID, LoadingState } from '../../types'
import { AppActionType, USER_LOGIN, USER_LOGOUT, SET_LOGIN_LOADING_STATE } from '../actions/types'

export enum loginStateEnum {
    LOGGED_OUT,
    LOGGED_IN,
}

export interface AuthorizationState {
    state: loginStateEnum
    userId: null | UserID
    token: string
    loadingState: LoadingState
}

const initialAuthState: AuthorizationState = {
    state: loginStateEnum.LOGGED_OUT,
    userId: null,
    token: null,
    loadingState: LoadingState.IDLE,
}

export default function authReducer(
    state: AuthorizationState = initialAuthState,
    action: AppActionType
): AuthorizationState {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                state: loginStateEnum.LOGGED_IN,
                token: action.token,
                userId: action.userId,
            }
        case USER_LOGOUT:
            return {
                ...state,
                state: loginStateEnum.LOGGED_OUT,
                token: null,
                userId: null,
            }
        case SET_LOGIN_LOADING_STATE:
            return {
                ...state,
                loadingState: action.loadingState,
            }
        default:
            return state
    }
}
