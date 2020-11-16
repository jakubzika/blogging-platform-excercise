import { Request, Response, Next } from 'restify'
import errors from 'restify-errors'
import { map, uniqBy } from 'lodash'

import { RouteHandler } from './route'
import { Router } from '../router'
import { createCommentDTO, getCommentDTO } from '../../../shared/dto/request-dto'
import { Article } from '../entity/article'
import { Comment } from '../entity/comment'
import { User } from '../entity/user'
import { FindManyOptions } from 'typeorm'
import { mapGetCommentsDTO, mapCommentDTO } from '../lib/dto-mapper'
import { queryParamToBool } from '../lib/util'

export class CommentController implements RouteHandler {
    registerHandler(router: Router) {
        router.setBase('/article/:article/comment')

        router.get('/', this.list)
        router.post('/', this.create, { authentication: true })
        router.del('/:comment', this.delete, { authentication: true })
    }

    async list(req: Request, res: Response, next: Next) {
        const articleId = req.params.article

        const queryparams: getCommentDTO = req.query

        let comments: Comment[] = []
        let users: User[] = null

        let dbQuery: FindManyOptions = {
            relations: [],
            where: { article: articleId },
        }

        if (queryParamToBool(queryparams.includeUsers)) {
            dbQuery.relations.push('creator')
        }

        comments = await Comment.find(dbQuery)

        if (queryParamToBool(queryparams.includeUsers)) {
            users = uniqBy(
                map(comments, (c) => c.creator),
                'id'
            )
        }

        res.send(mapGetCommentsDTO(comments, users))
        next()
    }

    async create(req: Request, res: Response, next: Next) {
        const articleId = req.params.article
        const userId = req['user'].uid
        const createCommentDTO: createCommentDTO = req.body

        const [article, user] = await Promise.all([
            Article.findOne({ id: articleId }),
            User.findOne({ id: userId }),
        ])

        if (article === undefined) {
            next(new errors.NotFoundError('Article with given id does not exist'))
            return
        }

        let comment = new Comment()
        comment.article = article
        comment.content = createCommentDTO.content
        comment.creator = user

        comment = await Comment.save(comment)

        res.send({
            comment: mapCommentDTO(comment),
        })
        next()
    }

    async delete(req: Request, res: Response, next: Next) {
        const comment = await Comment.findOne(req.params.comment)

        if (comment === undefined) {
            next(new errors.NotFoundError('Comment not found'))
            return
        }

        await comment.remove()
        res.send('ok')
        next()
    }
}
