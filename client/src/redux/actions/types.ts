import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { AppState } from '../reducers'
import { Article, User, ArticleComment, ArticleID, UserID, LoadingState } from '../../types'
import { UIState } from '../reducers/ui'

export const TESTING_ACTION = 'TESTING_ACTION'

interface TestingAction {
    type: typeof TESTING_ACTION
    payload: string
}

export const SET_ARTICLES = 'SET_ARTICLES'

// TODO: look at what parameters are needed
interface SetArticles {
    type: typeof SET_ARTICLES
    articles: Article[]
}

export const REMOVE_ARTICLES = 'REMOVE_ARTICLES'
interface RemoveArticles {
    type: typeof REMOVE_ARTICLES
    articles: ArticleID[]
}

export const SET_USERS = 'SET_USERS'

// TODO: look at what parameters are needed
interface SetUsers {
    type: typeof SET_USERS
    users: User[]
}

export const SET_COMMENTS = 'SET_COMMENTS'

interface SetComments {
    type: typeof SET_COMMENTS
    articleId: ArticleID
    comments: ArticleComment[]
}

export const ADD_COMMENT = 'ADD_COMMENT'

interface AddComment {
    type: typeof ADD_COMMENT
    comment: ArticleComment
    articleId: ArticleID
}

export const USER_LOGIN = 'USER_LOGIN'

interface UserLogin {
    type: typeof USER_LOGIN
    token: string
    userId: UserID
}

export const USER_LOGOUT = 'USER_LOGOUT'

interface UserLogout {
    type: typeof USER_LOGOUT
}

// TODO: more general loading state action for whole state tree
export const SET_LOGIN_LOADING_STATE = 'SET_LOGIN_LOADING_STATE'
interface SetLoginLoadingState {
    type: typeof SET_LOGIN_LOADING_STATE
    loadingState: LoadingState
}

export const SET_LOADING_STATE = 'SET_LOADING_STATE'
interface SetLoadingState {
    type: typeof SET_LOADING_STATE
    kind: keyof UIState
    loadingState: LoadingState
}

export type AppActionType =
    | TestingAction
    | SetArticles
    | SetUsers
    | SetComments
    | UserLogin
    | UserLogout
    | SetLoginLoadingState
    | SetLoadingState
    | AddComment
    | RemoveArticles

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>
