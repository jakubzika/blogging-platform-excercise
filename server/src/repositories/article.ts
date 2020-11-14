import { EntityRepository, Repository } from 'typeorm'
import { uniqBy, map } from 'lodash'

import { Article } from '../entity/article'
import { User } from '../entity/user'

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
    public getArticleWithVotes(id: number): Article {
        throw 'Not implemented'
    }

    // derive

    public async getArticles(options?: {
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

    public async getArticlesWithCreators(options: {
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
