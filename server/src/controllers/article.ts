import { Request, Response, Next } from 'restify'
import errors from 'restify-errors'

import { RouteHandler } from './route'
import { Router } from '../router'

import { User } from '../entity/user'
import { Article } from '../entity/article'
import { JwtData } from './user'
import { getArticlesDTO, createArticleDTO, editArticleDTO } from './dto'
import { ArticleRepository } from '../repositories/article'
import { DatabaseProvider } from '../database'

export class ArticleController implements RouteHandler {
    articleRepository: ArticleRepository

    async registerHandler(router: Router) {
        this.articleRepository = (await DatabaseProvider.getConnection()).getCustomRepository(
            ArticleRepository
        )

        router.setBase('/article')
        router.get('/', this.list.bind(this))
        router.get('/by/:user', this.listByUser.bind(this))
        router.get('/:article', this.get.bind(this))
        router.post('/', this.create.bind(this), { authentication: true })
        router.patch('/:article', this.update.bind(this), { authentication: true })
        router.del('/:article', this.delete.bind(this), { authentication: true })
    }

    async list(req: Request, res: Response, next: Next) {
        const queryParams: getArticlesDTO = req.query

        let articles: Article[]

        if (queryParams.skip && queryParams.take) {
            articles = await this.articleRepository.find({
                skip: queryParams.skip,
                take: queryParams.take,
            })
        } else {
            articles = await this.articleRepository.find({})
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

        this.articleRepository
            .findOne({ id: articleId })
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

        article = await this.articleRepository.save(article)

        res.send(article)
        next()
    }

    async update(req: Request, res: Response, next: Next) {
        // TODO: error handling, if article with given id does not exist
        const userId = req['user'].uid
        const editArticleDTO: editArticleDTO = req.body
        const articleId = req.params.article

        const [article, user] = await Promise.all([
            this.articleRepository.findOne(articleId),
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

        await this.articleRepository.save(article)

        res.send(article)
        next()
    }

    async delete(req: Request, res: Response, next: Next) {
        const articleId = req.params.article

        const article = await this.articleRepository.findOne(articleId)

        if (article === undefined) {
            next(new errors.NotFoundError('Article with given id does not exist'))
            return
        }

        article.remove()

        res.send('ok')
        next()
    }
}
