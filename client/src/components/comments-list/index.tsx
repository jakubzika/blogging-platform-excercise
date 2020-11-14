import React from 'react'

import { ArticleComment, User, UsersObject } from '../../types'
import { Comment } from '../comment'

import style from './style.scss'

export interface CommentsListProps {
    comments: ArticleComment[]
    users: UsersObject
}

export function CommentsList({ comments, users }: CommentsListProps) {
    return (
        <div>
            {comments &&
                comments.map((comment) => (
                    <Comment comment={comment} user={users[comment.creator]} key={comment.id} />
                ))}
        </div>
    )
}
