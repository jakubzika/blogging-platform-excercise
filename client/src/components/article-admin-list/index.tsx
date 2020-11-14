import React from 'react'
import moment from 'moment'

import { FiEdit2, FiTrash2 } from 'react-icons/fi'

import { ArticleID, Article } from '../../types'

import style from './style.scss'
import { cropString } from '../../lib/util'

export type ArticleAdminListProps = {
    articles: Article[]
}

export function articleAdminListItem(article: Article) {
    return (
        <div key={article.id} className={style.Item}>
            <span className={style.Title}>{article.title}</span>
            <span className={style.Perex}> {article.perex}</span>
            <span className={style.Created}>{moment(article.created).format('DD.MM. YYYY')}</span>
            <span className={style.Edit}>
                <FiEdit2 />
            </span>
            <span className={style.Delete}>
                <FiTrash2 />
            </span>
            <hr />
        </div>
    )
}

export function ArticleAdminList({ articles }: ArticleAdminListProps) {
    return (
        <div className={style.ArticleAdminList}>
            <div className={style.TableLabels}>
                <span className={style.Title}>Title</span>
                <span className={style.Perex}>Perex</span>
                <span className={style.Created}>Created</span>
                <span>Actions</span>
            </div>
            <hr />
            {articles.map((a: Article) => articleAdminListItem(a))}
        </div>
    )
}
