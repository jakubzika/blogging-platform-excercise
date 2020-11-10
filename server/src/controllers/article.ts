import { Request, Response, Next } from 'restify'
import errors from 'restify-errors'

import { RouteHandler } from './route'
import { Router } from '../router'

import { User } from '../entity/user'
import { Article } from '../entity/article'
import { JwtData } from './userLogin'
import {
    getArticlesDTO,
    getArticleDTO,
    createArticleDTO,
    editArticleDTO,
} from '../../../shared/dto/request-dto'
import { ArticleRepository } from '../repositories/article'
import { DatabaseProvider } from '../database'

import { mapArticleDTO, mapArticlestoDTO } from '../lib/dto-mapper'
import { listArticlesResponseDTO } from '../../../shared/dto/response-dto'
import { queryParamToBool } from '../lib/util'
import { FindOneOptions } from 'typeorm'

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
        // TODO: Check query validity
        const queryParams: getArticlesDTO = req.query

        let articles: Article[]

        let dbQuery: any = {
            relations: [],
        }

        if (queryParams.skip && queryParams.take) {
            dbQuery.skip = queryParams.skip
            dbQuery.take = queryParams.take
        }
        if (queryParams.includeCreator && queryParamToBool(queryParams.includeCreator)) {
            dbQuery.relations.push('creator')
        }

        articles = await this.articleRepository.find(dbQuery)

        const response: listArticlesResponseDTO = mapArticlestoDTO(articles)
        res.send(response)
        next()
    }

    async listByUser(req: Request, res: Response, next: Next) {
        const user: number = parseInt(req.params.user)
        next(new errors.NotImplementedError('feature not yet implemented'))
    }

    async get(req: Request, res: Response, next: Next) {
        let articleId: number

        articleId = parseInt(req.params.article, 10)
        const queryParams: getArticleDTO = req.query

        let dbQuery: FindOneOptions<Article> = {
            relations: [],
            select: ['id', 'title', 'perex', 'created', 'content'],
        }

        if (queryParams.includeComments && queryParamToBool(queryParams.includeComments)) {
            dbQuery.relations.push('comments')
        }
        if (queryParams.includeCreator && queryParamToBool(queryParams.includeCreator)) {
            dbQuery.relations.push('creator')
        }

        if (isNaN(articleId)) {
            next(new errors.BadRequestError('Invalid article id'))
            return
        }

        let article: Article = await this.articleRepository.findOne(articleId, dbQuery)

        if (article == undefined) {
            next(new errors.BadRequestError('Could not find article with given id'))
        } else {
            res.send({ article: mapArticleDTO(article) })
            next()
        }
    }

    async create(req: Request, res: Response, next: Next) {
        let article = new Article()

        // this must be of the form req['user'], Typescript cannot infer such information
        const userJwt: JwtData = req['user']

        const articleDTO: createArticleDTO = req.body

        const user: User = await User.findOne({ id: userJwt.uid })

        // TODO: use mapper
        article.content = articleDTO.content
        article.perex = articleDTO.perex
        article.title = articleDTO.title
        article.creator = user

        article = await this.articleRepository.save(article)

        res.send(mapArticleDTO(article))
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

        res.send(mapArticleDTO(article))
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
