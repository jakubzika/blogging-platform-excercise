import React from 'react'
import { Article, User } from '../../types'
import style from './style.scss'

export interface ArticleTitleProps {
    article: Article,
    user: User,
    load: ()=>void,
}

export function ArticleTitle({article,user,load}: ArticleTitleProps) {
    console.log(user)
    return(
        <div className={style.Article}>
            <h2>{article.id} - {article.title}</h2>
            <span>{article.perex}</span>
            <p>{article.content}</p>
            <span>{user && user.name}</span>
            <div>
                <button onClick={load}> read more</button>
            </div>
        </div>
    )
}