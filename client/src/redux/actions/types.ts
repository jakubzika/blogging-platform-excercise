import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { AppState } from '../reducers'
import { Article } from '../../types'

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

export type AppActionType = TestingAction | SetArticles

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>
