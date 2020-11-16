import axios, { AxiosInstance } from 'axios'
import {
    getArticleResponseDTO,
    listArticlesResponseDTO,
    getCommentsResponseDTO,
    loginResponseDTO,
    authorizedUserdResponseDTO,
    createCommentResponseDTO,
    editArticleResponseDTO,
    createArticleResponseDTO,
    deleteArticleResponseDTO,
} from '../../../shared/dto/response-dto'
import {
    mapFromArticlesDTO,
    mapFromArticleDTO,
    mapFromUserDTO,
    mapFromCommentsDTO,
    mapFromusersDTO,
    mapFromCommentDTO,
} from '../lib/dto-mapper'
import { Article, ArticleID, User, ArticleComment, UserID } from '../types'
import { getArticlesDTO, editArticleDTO, createArticleDTO } from '../../../shared/dto/request-dto'

import { boolToString } from '../lib/util'

const API_URL = process.env.API_URL

// TODO: error handling
class ApiService {
    token?: string
    api: AxiosInstance

    constructor() {
        this.token = null
        this.api = axios.create({
            baseURL: API_URL,
        })

        this.api.interceptors.request.use((config) => {
            if (this.token) {
                config.headers.Authorization = `bearer ${this.token}`
            }
            return config
        })
    }

    setToken(token: string) {
        this.token = token
    }

    getArticles(options?: {
        includeCreator?: boolean
        fromUser?: UserID
    }): Promise<{ articles: Article[]; creators: User[] }> {
        const request: getArticlesDTO = {
            includeCreator: options && options.includeCreator && boolToString(true),
            fromUser: options && options.fromUser,
        }

        return this.api
            .get<listArticlesResponseDTO>(`/article/`, {
                params: request,
            })
            .then((response): { articles: Article[]; creators: User[] } => {
                return mapFromArticlesDTO(response.data)
            })
    }

    getArticle(
        id: ArticleID,
        includeContent: boolean = true,
        includeCreator: boolean = true
    ): Promise<{ article: Article; creator: User }> {
        // TODO: DTO mapper
        return this.api
            .get<getArticleResponseDTO>(`/article/${id.valueOf()}`, {
                params: {
                    includeContent: boolToString(includeContent),
                    includeCreator: boolToString(includeCreator),
                },
            })
            .then((response) => {
                return {
                    article: mapFromArticleDTO(response.data.article),
                    creator: mapFromUserDTO(response.data.creator),
                }
            })
    }

    editArticle(
        articleId: ArticleID,
        title: string,
        perex: string,
        content: string
    ): Promise<Article> {
        const request: editArticleDTO = {
            title,
            perex,
            content,
        }

        return this.api
            .patch<editArticleResponseDTO>(`/article/${articleId.valueOf()}`, request)
            .then((response) => {
                if (!response.data.success) return null
                return mapFromArticleDTO(response.data.article)
            })
            .catch((err) => {
                return null
            })
    }

    createArticle(title: string, perex: string, content: string) {
        const request: createArticleDTO = {
            title,
            perex,
            content,
        }

        return this.api
            .post<createArticleResponseDTO>(`/article/`, request)
            .then((response) => {
                if (!response.data.success) return null
                return mapFromArticleDTO(response.data.article)
            })
            .catch((err) => {
                return null
            })
    }

    deleteArticle(articleId: ArticleID): Promise<boolean> {
        return this.api
            .delete<deleteArticleResponseDTO>(`/article/${articleId}`)
            .then((response) => {
                return response.data.success
            })
            .catch((err) => {
                return false
            })
    }

    getComments(articleId: ArticleID): Promise<{ comments: ArticleComment[]; users: User[] }> {
        return this.api
            .get<getCommentsResponseDTO>(`/article/${articleId.valueOf()}/comment/`, {
                params: {
                    includeUsers: boolToString(true),
                },
            })
            .then((response) => {
                return {
                    comments: mapFromCommentsDTO(response.data.comments),
                    users: mapFromusersDTO(response.data.users),
                }
            })
    }

    addComment(content: string, articleId: ArticleID): Promise<ArticleComment | null> {
        return this.api
            .post<createCommentResponseDTO>(`/article/${articleId.valueOf()}/comment/`, { content })
            .then((response) => {
                console.log('add comment success')
                console.log(response.data)
                return mapFromCommentDTO(response.data.comment)
            })
            .catch((err) => {
                console.log('add comment failure', err)
                return null
            })
    }

    login(
        email: string,
        password: string
    ): Promise<{ user: User; userId: UserID; token: string } | null> {
        return this.api
            .post<loginResponseDTO>('/user/login', { email, password })
            .then((response) => {
                if (response.data.successful) {
                    this.token = response.data.token
                    const user = mapFromUserDTO(response.data.user)
                    return {
                        user: user,
                        token: response.data.token,
                        userId: user.id,
                    }
                } else {
                    return null
                }
            })
    }

    isAuthorized(): Promise<User | null> {
        return this.api
            .get<authorizedUserdResponseDTO>('/user/authorized')
            .then((response) => {
                return mapFromUserDTO(response.data.user)
            })
            .catch((err) => {
                return null
            })
    }
}

export default new ApiService()
