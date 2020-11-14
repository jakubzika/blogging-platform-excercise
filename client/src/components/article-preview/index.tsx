import React from 'react'
import { Article, User } from '../../types'
import { Link } from 'react-router-dom'
import moment from 'moment'

import style from './style.scss'

export interface ArticlePreviewProps {
    article: Article
    user: User
    load: () => void
}

export function ArticlePreview({ article, user, load }: ArticlePreviewProps) {
    return (
        <div className={style.Article}>
            <h2 className={style.Title}>{article.title}</h2>
            <div className={style.SubInformation}>
                <span>{user && user.name}</span>
                <span className={style.SeparatorDot}></span>
                <span>{moment(article.created).fromNow()}</span>
            </div>
            <p className={style.Perex}>{article.perex}</p>
            <div>
                <Link to={`/article/${article.id}`} onClick={load} className={style.ReadMore}>
                    Read whole article
                </Link>
            </div>
        </div>
    )
}
