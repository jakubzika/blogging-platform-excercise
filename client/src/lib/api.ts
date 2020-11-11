import axios from 'axios'
import { getArticleResponseDTO, listArticlesResponseDTO } from '../../../shared/dto/response-dto'
import { mapFromArticlesDTO, mapFromArticleDTO, mapFromUserDTO } from './dto-mapper'
import { Article, ArticleID, User } from '../types'
import { boolToString } from './util'

const API_URL = 'http://localhost:8080'

axios.defaults.baseURL = API_URL

const getArticles = (): Promise<{ articles: Article[]; creators: User[] }> => {
    return axios
        .get<listArticlesResponseDTO>(`/article/`, {
            params: { includeCreator: boolToString(true) },
        })
        .then((response): { articles: Article[]; creators: User[] } => {
            return mapFromArticlesDTO(response.data)
        })
}

const getArticle = (
    id: ArticleID,
    includeContent: boolean = true,
    includeCreator: boolean = true
): Promise<{ article: Article; creator: User }> => {
    // TODO: DTO mapper
    return axios
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

export default {
    getArticles,
    getArticle,
}
