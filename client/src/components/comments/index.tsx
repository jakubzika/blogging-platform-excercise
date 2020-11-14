import React, { useState } from 'react'
import {
    AuthorizedUserConnectorProps,
    authorizedUserConnector,
} from '../../containers/authorized-user'
import { ArticleComment, UsersObject } from '../../types'
import { CommentsList } from '../comments-list'

import style from './style.scss'

export type CommentsProps = AuthorizedUserConnectorProps & {
    comments: ArticleComment[]
    users: UsersObject
}

export function comments({ comments, users, loggedInUser }: CommentsProps) {
    const [comment, setComment] = useState('')

    const submit = () => {
        console.log('submit comment', comment)
    }

    const onEnter = (evt: React.KeyboardEvent) => {
        if (evt.key === 'Enter' && comment !== '') {
            console.log('submit comment ', comment)
            setComment('')
        }
    }

    return (
        <div className={style.Comments}>
            {loggedInUser && (
                <div className={style.CreateComment}>
                    <input
                        value={comment}
                        onKeyDown={onEnter}
                        onChange={(evt) => setComment(evt.target.value)}
                        placeholder={'Join the discussion'}
                        onSubmit={submit}
                    />
                </div>
            )}
            <CommentsList comments={comments} users={users} />
        </div>
    )
}

export const Comments = authorizedUserConnector(comments)
