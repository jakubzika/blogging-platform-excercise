import React from 'react'
import moment from 'moment'

import { Article, User, UsersObject } from '../../types'
import { Title } from '../title'

import style from './style.scss'
import { CommentsList } from '../comments-list'
import { Comments } from '../comments'
import { addComment } from '../../redux/actions/app'

export interface ArticleProps {
    article: Article
    creator: User
    users: UsersObject
    addComment: (content: string) => any
}

export function Article({ article, creator, users, addComment }: ArticleProps) {
    return (
        <div>
            <Title>{article.title}</Title>
            <div className={style.SubInformation}>
                <span>{creator && creator.name}</span>
                <span className={style.SeparatorDot}></span>
                <span>{moment(article.created).fromNow()}</span>
            </div>
            <p className={style.Content}>{article.content}</p>
            <hr className={style.Separator} />
            <h2>Comments {article.comments && ` (${article.comments.length})`}</h2>
            {article.comments && (
                <Comments comments={article.comments} users={users} addComment={addComment} />
            )}
        </div>
    )
}
