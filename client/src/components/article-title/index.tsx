import React from 'react'
import { Article } from '../../types'
import style from './style.scss'

export interface ArticleTitleProps {
    article: Article,
    load: ()=>void,
}

export function ArticleTitle({article,load}: ArticleTitleProps) {
    return(
        <div className={style.Article}>
            <h2>{article.id} - {article.title}</h2>
            <span>{article.perex}</span>
            <p>{article.content}</p>
            <span>{}</span>
            <div>
                <button onClick={load}> read more</button>
            </div>
        </div>
    )
}