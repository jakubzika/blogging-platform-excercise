import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { AppState } from '../reducers'
import { Article, User } from '../../types'

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

export const SET_USERS = 'SET_USERS'

// TODO: look at what parameters are needed
interface SetUsers {
    type: typeof SET_USERS
    users: User[]
}

export type AppActionType = TestingAction | SetArticles | SetUsers

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>
