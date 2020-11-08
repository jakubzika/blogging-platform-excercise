import { EntityRepository, Repository } from 'typeorm'
import { Article } from '../entity/article'

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
    public getArticleWithVotes(id: number): Article {
        throw 'Not implemented'
    }
}
