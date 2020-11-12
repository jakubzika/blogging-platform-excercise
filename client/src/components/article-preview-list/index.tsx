import React from 'react'
import { Article, User } from '../../types'
import { ArticlePreview } from '../article-preview'
import { loadArticle } from '../../redux/actions/app'

import style from './style.scss'

export interface ArticlePreviewListProps {
    articles: Article[],
    users: {[key: number]: User}
    loadArticle: typeof loadArticle
}

export function ArticlePreviewList({loadArticle,articles,users}: ArticlePreviewListProps) {
    return(
        <div className={style.ArticlePreviewList}>
                {articles.map((article) => (
                    <ArticlePreview
                        key={article.id.valueOf()}
                        load={()=>loadArticle(article.id)}
                        article={article}
                        user={users[Number(article.creator)]}
                    />
                ))}
        </div>
    )
}   