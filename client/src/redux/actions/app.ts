import { AppActionType, TESTING_ACTION, AppThunk, SET_ARTICLES } from './types'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../reducers'
import { Action } from 'redux'
import api from '../../lib/api'
import { Article, ArticleID } from '../../types'

export function testingAction(msg: string): AppActionType {
    return {
        type: TESTING_ACTION,
        payload: msg,
    }
}

export function setArticles(articles: Article[]): AppActionType {
    return {
        type: SET_ARTICLES,
        articles: articles,
    }
}

export function loadArticles(): AppThunk {
    return async (dispatch) => {
        const articles = await api.getArticles()
        dispatch(setArticles(articles))
    }
}

export function loadArticle(
    id: ArticleID,
    content: boolean = true,
    creator: boolean = true
): AppThunk {
    return async (dispatch) => {
        const article = await api.getArticle(id, creator, content)
        dispatch(setArticles([article]))
    }
}
