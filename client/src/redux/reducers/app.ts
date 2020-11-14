import { Article, User, ArticleID } from '../../types'
import {
    AppActionType,
    TESTING_ACTION,
    SET_ARTICLES,
    SET_USERS,
    SET_COMMENTS,
    ADD_COMMENT,
} from '../actions/types'

export interface State {
    articles: { [key: number]: Article }
    users: { [key: number]: User }
    loading: Boolean
    message: String
}

const initialState: State = {
    articles: {},
    users: {},
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
        case SET_ARTICLES:
            //TODO: no overwriting of loaded content
            return {
                ...state,
                articles: {
                    ...state.articles,
                    ...action.articles.reduce((map, article) => {
                        map[article.id.valueOf()] = article
                        return map
                    }, {}),
                },
            }
        case SET_USERS:
            return {
                ...state,
                users: {
                    ...state.users,
                    ...action.users.reduce((map, user) => {
                        map[user.id.valueOf()] = user
                        return map
                    }, {}),
                },
            }
        case SET_COMMENTS:
            return {
                ...state,
                articles: {
                    ...state.articles,
                    [action.articleId]: {
                        ...state.articles[action.articleId],
                        comments: action.comments,
                    },
                },
            }
        case ADD_COMMENT:
            return {
                ...state,
                articles: {
                    ...state.articles,
                    [action.articleId]: {
                        ...state.articles[action.articleId],
                        comments: [action.comment, ...state.articles[action.articleId].comments],
                    },
                },
            }
        default:
            return state
    }
}
