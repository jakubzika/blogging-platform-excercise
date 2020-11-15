import React from 'react'
import { Article, ArticleID } from '../../types'
import { Title } from '../title'
import { ArticleAdminList } from '../article-admin-list'
import { Button } from '../button'

import style from './style.scss'
import { Link, Route, Switch } from 'react-router-dom'
import { ArticleEditor } from '../article-editor'

export type ArticleAdminProps = {
    articles: Article[]
    loadArticle: (articleId: ArticleID) => any
}

export function ArticleAdmin({ articles }: ArticleAdminProps) {
    return (
        <div>
            <div>
                <Title>My articles</Title>
            </div>
            <div className={style.PublishButton}>
                <Link to={'profile/create-article'}>
                    <Button onClick={() => {}}>Create new article</Button>
                </Link>
            </div>
            <ArticleAdminList articles={articles} />
        </div>
    )
}
