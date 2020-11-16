import { EntityRepository, Repository } from 'typeorm'
import { uniqBy, map } from 'lodash'

import { Article } from '../entity/article'
import { User } from '../entity/user'

/**
 * Repository containing more advanced operations with Article entity
 */
@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
    /**
     * Fetches articles from database
     *
     * @param  {{skip?:numbertake?:numberwhere?:string[]}} options?
     * @returns Promise
     */
    async getArticles(options?: {
        skip?: number
        take?: number
        where?: string[]
    }): Promise<Article[]> {
        let dbQuery: any = {}

        if (options && options.where) {
            dbQuery.where = options.where
        }

        if (options.skip && options.take) {
            dbQuery.skip = options.skip
            dbQuery.take = options.take
        }

        let articles = await this.find(dbQuery)

        return articles
    }
    /**
     * Fetches articles from database
     * including article creators
     *
     * @param  {{skip?:numbertake?:numberwhere?:string[]}} options
     * @returns {Article[], User[]}
     */
    async getArticlesWithCreators(options: {
        skip?: number
        take?: number
        where?: string[]
    }): Promise<{ articles: Article[]; users: User[] }> {
        let dbQuery: any = {
            relations: ['creator'],
        }

        if (options && options.where) {
            dbQuery.where = options.where
        }

        if (options.skip && options.take) {
            dbQuery.skip = options.skip
            dbQuery.take = options.take
        }

        let articles = await this.find(dbQuery)

        let users: User[] = uniqBy(
            map(articles, (a) => a.creator),
            'id'
        )

        return { articles, users }
    }
}
