import { Request, Response, Next } from 'restify'
import errors from 'restify-errors'

import { RouteHandler } from './route'
import { Router } from '../router'

import { User } from '../entity/user'
import { Article } from '../entity/article'
import { JwtData } from './user'
import { getArticlesDTO, createArticleDTO, editArticleDTO } from './dto'

export class ArticleController implements RouteHandler {
    registerHandler(router: Router) {
        router.setBase('/article')

        router.get('/', this.list)
        router.get('/by/:user', this.listByUser)
        router.get('/:article', this.get)
        router.post('/', this.create, { authentication: true })
        router.patch('/:article', this.update, { authentication: true })
        router.del('/:article', this.delete, { authentication: true })
    }

    async list(req: Request, res: Response, next: Next) {
        const queryParams: getArticlesDTO = req.query

        let articles: Article[]

        if (queryParams.skip && queryParams.take) {
            articles = await Article.find({ skip: queryParams.skip, take: queryParams.take })
        } else {
            // this option could be removed as it allows scraping of all articles
            articles = await Article.find({})
        }

        res.send(articles)
        next()
    }

    async listByUser(req: Request, res: Response, next: Next) {
        const user: number = parseInt(req.params.user)
        next(new errors.NotImplementedError('feature not yet implemented'))
    }

    async get(req: Request, res: Response, next: Next) {
        let articleId: number

        articleId = parseInt(req.params.article, 10)

        if (isNaN(articleId)) {
            next(new errors.BadRequestError('Invalid article id'))
            return
        }

        Article.findOne({ id: articleId })
            .then((article) => {
                if (article == undefined) {
                    next(new errors.BadRequestError('Could not find article with given id'))
                } else {
                    res.send(article)
                    next()
                }
            })
            .catch((err) => {
                next(new errors.InternalServerError('Error while accesing database'))
            })
    }

    async create(req: Request, res: Response, next: Next) {
        let article = new Article()

        // sad walkaround because Request property has not specified user type when authentication is enabled
        const userJwt: JwtData = req['user']

        const articelDTO: createArticleDTO = req.body

        const user: User = await User.findOne({ id: userJwt.uid })

        // TODO: there could also be mapper functions to map between DTO and database entity
        article.content = articelDTO.content
        article.perex = articelDTO.perex
        article.title = articelDTO.title
        article.creator = user

        article = await Article.save(article)

        res.send(article)
        next()
    }

    async update(req: Request, res: Response, next: Next) {
        // TODO: error handling, if article with given id does not exist
        const userId = req['user'].uid
        const editArticleDTO: editArticleDTO = req.body
        const articleId = req.params.article

        const [article, user] = await Promise.all([
            Article.findOne(articleId),
            User.findOne({ id: userId }),
        ])
        if (article === undefined) {
            next(new errors.NotFoundError('Article with given id does not exist'))
        } else if (article.creatorId !== userId) {
            next(new errors.UnauthorizedError('User does not have access to this article'))
        }

        article.content = editArticleDTO.content
        article.perex = editArticleDTO.perex
        article.title = editArticleDTO.title

        await Article.save(article)

        res.send(article)
        next()
    }

    async delete(req: Request, res: Response, next: Next) {
        const articleId = req.params.article

        const article = await Article.findOne(articleId)

        if (article === undefined) {
            next(new errors.NotFoundError('Article with given id does not exist'))
            return
        }

        article.remove()

        res.send('ok')
        next()
    }
}
