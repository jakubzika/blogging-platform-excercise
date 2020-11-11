import React from 'react'
import moment from 'moment'

import { Article, User } from "../../types"
import { Title } from '../title'

import style from './style.scss'

export interface ArticleProps {
    article: Article
    creator: User
}

export function Article({article,creator}: ArticleProps) {
    return (
        <div>
            <Title>{article.title}</Title>
            <div className={style.SubInformation}>
                <span>
                    {creator && creator.name}
                </span>
                <span className={style.SeparatorDot}></span>
                <span>
                    {moment(article.created).fromNow()}
                </span>
            </div>
            <p className={style.Content}>
                {article.content}
            </p>
        </div>
    )
}