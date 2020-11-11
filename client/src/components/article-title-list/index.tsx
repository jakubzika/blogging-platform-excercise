import React from 'react'
import { Article, User } from '../../types'
import { ArticleTitle } from '../article-title'
import { loadArticle } from '../../redux/actions/app'

export interface ArticleTitleListProps {
    articles: Article[],
    users: {[key: number]: User}
    loadArticle: typeof loadArticle
}

export function ArticleTitleList({loadArticle,articles,users}: ArticleTitleListProps) {
    return(
        <div>
                {articles.map((article) => (
                    <ArticleTitle
                        key={article.id.valueOf()}
                        load={()=>loadArticle(article.id)}
                        article={article}
                        user={users[Number(article.creator)]}
                    />
                ))}
        </div>
    )
}