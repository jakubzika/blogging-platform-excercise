import React from 'react'
import moment from 'moment'

import { ArticleComment, User } from '../../types'

import style from './style.scss'

export interface CommentProps {
    comment: ArticleComment
    user: User
}

export function Comment({ comment, user }: CommentProps) {
    console.log(user)
    return (
        <div className={style.Comment}>
            <div className={style.CommentHead}>
                <span className={style.Name}>{user && user.name}</span>
                
                <span className={style.Created}>{comment && moment(comment.created).fromNow()}</span>
            </div>
            <p className={style.Content}>{comment && comment.content}</p>
        </div>
    )
}
