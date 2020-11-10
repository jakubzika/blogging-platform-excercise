import { AppActionType, TESTING_ACTION, AppThunk, SET_ARTICLES, SET_USERS } from './types'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../reducers'
import { Action } from 'redux'
import api from '../../lib/api'
import { Article, ArticleID, User } from '../../types'
import { useStore } from 'react-redux'

export function testingAction(msg: string): AppActionType {
    return {
        type: TESTING_ACTION,
        payload: msg,
    }
}

export function setArticles(articles: Article[]): AppActionType {
    return {
        type: SET_ARTICLES,
        articles,
    }
}

export function setUsers(users: User[]) {
    console.log('set users')
    return {
        type: SET_USERS,
        users,
    }
}

export function loadArticles(): AppThunk {
    return async (dispatch) => {
        const response = await api.getArticles()
        dispatch(setArticles(response.articles))
        console.log('creators', response.creators)
        if (response.creators) dispatch(setUsers(response.creators))
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
