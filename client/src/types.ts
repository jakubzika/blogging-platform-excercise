import {
    articleDTO,
    commentDTO,
    getArticleResponseDTO,
    listArticlesResponseDTO,
    responseDTO,
    userDTO,
} from '../../shared/dto/response-dto'
import { State } from './redux/reducers/app'

// TODO: types could be move to their appropriate locations, otherwise this file will only grow ugly

export type UserID = number
export interface User {
    id: UserID
    name: string
    email?: string
}

export type CommentID = number
export interface ArticleComment {
    id: CommentID
    creator: UserID
    content: string
    created: Date
}

export type ArticleID = number
export type Votes = number
export interface Article {
    id: ArticleID
    title: string
    creator: UserID
    perex: string
    content?: string
    loaded: boolean
    created: Date
    edited?: Date
    votes: Votes
}
