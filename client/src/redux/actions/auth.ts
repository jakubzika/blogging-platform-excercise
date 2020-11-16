import { AppActionType, SET_LOGIN_LOADING_STATE, AppThunk, USER_LOGIN, USER_LOGOUT } from './types'
import { LoadingState, UserID, User } from '../../types'
import api from '../../services/api'
import { setUsers } from './app'
import localStoreService from '../../services/local-store'
import { setLoadingState } from './ui'

export function setLoginLoadingState(loadingState: LoadingState): AppActionType {
    return {
        type: SET_LOGIN_LOADING_STATE,
        loadingState,
    }
}

export function userLogin(userId: UserID, token: string): AppActionType {
    return {
        type: USER_LOGIN,
        token,
        userId,
    }
}

export function userLogout(): AppActionType {
    return {
        type: USER_LOGOUT,
    }
}

export function login(email: string, password: string): AppThunk {
    return async (dispatch) => {
        dispatch(setLoadingState(LoadingState.LOADING, 'loginLoading'))
        const response = await api.login(email, password)
        if (response === null) {
            dispatch(setLoadingState(LoadingState.FAILURE, 'loginLoading'))
        } else {
            dispatch(setUsers([response.user]))
            dispatch(userLogin(response.userId, response.token))
            dispatch(setLoadingState(LoadingState.IDLE, 'loginLoading'))
            localStoreService.setToken(response.token)
        }
    }
}

export function restoreUser(): AppThunk {
    return async (dispatch) => {
        if (localStoreService.isStoredToken()) {
            const token = localStoreService.getToken()
            api.setToken(token)
            const user: User | null = await api.isAuthorized()
            if (user !== null) {
                dispatch(setUsers([user]))
                dispatch(userLogin(user.id, token))
            } else {
                api.setToken(null)
                dispatch(userLogout())
            }
        } else {
            dispatch(userLogout())
        }
    }
}

export function logout(): AppThunk {
    return async (dispatch) => {
        localStoreService.clearToken()
        // TODO: invalidate token on server
        dispatch(userLogout())
        window.location.reload()
    }
}
