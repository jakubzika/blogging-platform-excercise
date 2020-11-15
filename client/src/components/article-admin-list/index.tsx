import React from 'react'
import moment from 'moment'

import { FiEdit2, FiTrash2 } from 'react-icons/fi'

import { ArticleID, Article } from '../../types'

import style from './style.scss'
import { cropString } from '../../lib/util'
import { Link } from 'react-router-dom'

export type ArticleAdminListProps = {
    articles: Article[]
    deleteArticle: (articleId: ArticleID) => any
}

export function articleAdminListItem(article: Article, deleteArticle: () => any) {
    return (
        <div key={article.id} className={style.Item}>
            <span className={style.Title}>{article.title}</span>
            <span className={style.Perex}> {article.perex}</span>
            <span className={style.Created}>{moment(article.created).format('DD.MM. YYYY')}</span>
            <span className={style.Edit}>
                <Link to={`/profile/edit-article/${article.id}`}>
                    <FiEdit2 />
                </Link>
            </span>
            <span className={style.Delete}>
                <a onClick={deleteArticle} href={'#'}>
                    <FiTrash2 />
                </a>
            </span>
            <hr />
        </div>
    )
}

export function ArticleAdminList({ articles, deleteArticle }: ArticleAdminListProps) {
    return (
        <div className={style.ArticleAdminList}>
            <div className={style.TableLabels}>
                <span className={style.Title}>Title</span>
                <span className={style.Perex}>Perex</span>
                <span className={style.Created}>Created</span>
                <span>Actions</span>
            </div>
            <hr />
            {articles.map((a: Article) => articleAdminListItem(a, () => deleteArticle(a.id)))}
        </div>
    )
}
