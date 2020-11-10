import { Article } from '../entity/article'
import {
    getArticleResponseDTO,
    articleDTO,
    userDTO,
    listArticlesResponseDTO,
    commentDTO,
} from '../../../shared/dto/response-dto'
import { User } from '../entity/user'
import { Comment } from '../entity/comment'

export const mapUserDTO = (user: User, omitEmail: boolean = false): userDTO => ({
    id: user.id,
    name: user.name,
    email: omitEmail ? null : user.email,
})

export const mapCommentDTO = (comment: Comment): commentDTO => ({
    id: comment.id,
    article: comment.articleId,
    content: comment.content,
    created: comment.created,
    creator: comment.creatorId,
})

export const mapArticleDTO = (article: Article, omitCreator: boolean = false): articleDTO => ({
    id: article.id,
    title: article.title,
    perex: article.perex,
    content: article.content,
    created: article.created,
    creator:
        article.creator && typeof article.creator === 'object' && !omitCreator
            ? mapUserDTO(article.creator, true)
            : article.creatorId,
    comments: article.comments ? article.comments.map(mapCommentDTO) : null,
    votes: 0, // TODO: implement votes
})

export const mapArticlesDTO = (articles: Article[]): listArticlesResponseDTO => ({
    articles: articles.map((a) => mapArticleDTO(a, true)),
})

export const mapArticlesWithCreatorsDTO = (
    articles: Article[],
    creators?: User[]
): listArticlesResponseDTO => ({
    articles: articles.map((a) => mapArticleDTO(a, true)),
    creators: creators.map((u) => mapUserDTO(u)),
})
