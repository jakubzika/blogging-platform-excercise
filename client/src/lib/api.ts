import axios from 'axios'
import { getArticleResponseDTO, listArticlesResponseDTO } from '../../../shared/dto/response-dto'
import { mapFromArticlesDTO, mapFromArticleDTO } from './dto-mapper'
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
): Promise<Article> => {
    // TODO: DTO mapper
    return axios
        .get<getArticleResponseDTO>(`/article/${id.valueOf()}`, {
            params: {
                includeContent: boolToString(includeContent),
                includeCreator: boolToString(includeCreator),
            },
        })
        .then(
            (response): Article => {
                console.log(mapFromArticleDTO(response.data.article))
                return mapFromArticleDTO(response.data.article)
            }
        )
}

export default {
    getArticles,
    getArticle,
}
