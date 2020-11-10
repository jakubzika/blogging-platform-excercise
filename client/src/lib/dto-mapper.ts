import { articleDTO, userDTO, listArticlesResponseDTO } from '../../../shared/dto/response-dto'
import { Article, UserID, User } from '../types'

export const mapFromUserDTO = (user: userDTO): User => user

export const mapFromArticleDTO = (article: articleDTO): Article => ({
    ...article,
    created: new Date(article.created),
    edited: article.edited ? new Date(article.edited) : null,
    loaded: article.content !== null,
})

export const mapFromArticlesDTO = (
    data: listArticlesResponseDTO
): { articles: Article[]; creators: User[] } => {
    return {
        articles: data.articles.map(mapFromArticleDTO),
        creators: data.creators !== null ? data.creators.map(mapFromUserDTO) : null,
    }
}
