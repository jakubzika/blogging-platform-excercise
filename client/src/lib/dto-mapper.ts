import { articleDTO, userDTO, listArticlesResponseDTO } from '../../../shared/dto/response-dto'
import { Article, UserID, User } from '../types'

//
export const mapFromUserDTO = (user: number | userDTO): UserID | User => user

export const mapFromArticleDTO = (article: articleDTO): Article => ({
    ...article,
    created: new Date(article.created),
    edited: article.edited ? new Date(article.edited) : null,
    loaded: article.content !== null,
})

export const mapFromArticlesDTO = (articles: listArticlesResponseDTO): Article[] => {
    return articles.articles.map(mapFromArticleDTO)
}
