import React from 'react'

import { ArticleComment, User, UsersObject } from '../../types'
import { Comment } from '../comment'

import style from './style.scss'

export interface CommentsListProps {
    comments: ArticleComment[]
    users: UsersObject
}

export function CommentsList({ comments, users }: CommentsListProps) {
    const sortedComments: ArticleComment[] = comments.sort(
        (a: any, b: any) => b.created - a.created
    )

    return (
        <div>
            {comments &&
                sortedComments.map((comment) => (
                    <Comment comment={comment} user={users[comment.creator]} key={comment.id} />
                ))}
        </div>
    )
}
