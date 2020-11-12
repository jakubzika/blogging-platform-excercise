import {
    AppActionType,
    TESTING_ACTION,
    AppThunk,
    SET_ARTICLES,
    SET_USERS,
    SET_COMMENTS,
} from './types'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../reducers'
import { Action } from 'redux'
import api from '../../lib/api'
import { Article, ArticleID, User, ArticleComment } from '../../types'
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
    includeContent: boolean = true,
    includeCreator: boolean = true
): AppThunk {
    return async (dispatch) => {
        const { article, creator } = await api.getArticle(id, includeCreator, includeContent)
        dispatch(setArticles([article]))
        dispatch(setUsers([creator]))
        dispatch(loadComments(id))
    }
}

export function setComments(articleId: ArticleID, comments: ArticleComment[]): AppActionType {
    return {
        type: SET_COMMENTS,
        articleId: articleId,
        comments: comments,
    }
}

export function loadComments(articleId: ArticleID): AppThunk {
    return async (dispatch) => {
        const response = await api.getComments(articleId)
        dispatch(setComments(articleId, response.comments))
        if (response.users) dispatch(setUsers(response.users))
    }
}
