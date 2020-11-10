import React from 'react'
import { Article } from '../types'
import { ArticleTitle } from './article-title'
import { loadArticle } from '../redux/actions/app'

export interface ArticleTitleListProps {
    articles: Article[],
    loadArticle: typeof loadArticle
}

export function ArticleTitleList({loadArticle,articles}: ArticleTitleListProps) {
    return(
        <div>
                {articles.map((article) => (<ArticleTitle key={article.id.valueOf()} load={()=>loadArticle(article.id)} article={article} />))}
        </div>
    )
}