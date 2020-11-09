import {
    articleDTO,
    commentDTO,
    getArticleResponseDTO,
    listArticlesResponseDTO,
    responseDTO,
    userDTO,
} from '../../shared/dto/response-dto'

// TODO: types could be move to their appropriate locations, otherwise this file will only grow ugly

export type UserID = Number
export interface User {
    id: UserID
    name: String
    email: String
}

export type CommentID = Number
export interface ArticleComment {
    id: CommentID
    creator: UserID
    content: String
    created: Date
}

export type ArticleID = Number
export type Votes = Number
export interface Article {
    id: ArticleID
    title: String
    author: Number
    perex: String
    content?: String
    loaded: Boolean
    created: Date
    edited?: Date
    votes: Votes
}

export interface State {
    articles: Article[]
    users: User[]
    loading: Boolean
    message: String
}

export interface AppState {
    app: State
}
