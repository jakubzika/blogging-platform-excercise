import {
    articleDTO,
    userDTO,
    listArticlesResponseDTO,
    commentDTO,
} from '../../../shared/dto/response-dto'
import { Article, UserID, User, ArticleComment } from '../types'

export const mapFromUserDTO = (user: userDTO): User => user

export const mapFromusersDTO = (users: userDTO[]): User[] => users.map(mapFromUserDTO)

export const mapFromArticleDTO = (article: articleDTO): Article => ({
    ...article,
    created: new Date(article.created),
    edited: article.edited ? new Date(article.edited) : null,
    loaded: !!article.content,
    comments: null,
})

export const mapFromArticlesDTO = (
    data: listArticlesResponseDTO
): { articles: Article[]; creators: User[] } => {
    return {
        articles: data.articles.map(mapFromArticleDTO),
        creators: data.creators ? data.creators.map(mapFromUserDTO) : null,
    }
}

export const mapFromCommentDTO = (comment: commentDTO): ArticleComment => ({
    ...comment,
    created: new Date(comment.created),
})

export const mapFromCommentsDTO = (comments: commentDTO[]): ArticleComment[] =>
    comments.map(mapFromCommentDTO)
