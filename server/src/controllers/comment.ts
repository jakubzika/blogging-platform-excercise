import { Request, Response, Next } from 'restify'
import errors from 'restify-errors'

import { RouteHandler } from './route'
import { Router } from '../router'
import { createCommentDTO } from './dto'
import { Article } from '../entity/article'
import { Comment } from '../entity/comment'
import { User } from '../entity/user'

export class CommentController implements RouteHandler {
    registerHandler(router: Router) {
        router.setBase('/article/:article/comment')

        router.post('/', this.create, { authentication: true })
        router.del('/:comment', this.delete, { authentication: true })
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
            id: comment.id,
            article: comment.article.id,
            content: comment.content,
            created: comment.created,
        })
        next()
    }

    async delete(req: Request, res: Response, next: Next) {
        const comment = await Comment.findOne(req.params.comment)
        console.log('trying to delete comment', comment)

        if (comment === undefined) {
            next(new errors.NotFoundError('Comment not found'))
            return
        }

        await comment.remove()
        res.send('ok')
        next()
    }
}
