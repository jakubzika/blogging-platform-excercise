import React, { useState } from 'react'
import { Article } from '../../types'
import { Button } from '../button'

import style from './style.scss'

export type ArticleEditorProps = {
    title: string
    perex: string
    content: string
    onSubmit: (title: string, perex: string, content: string) => any
}

export function ArticleEditor(props: ArticleEditorProps) {
    const [title, setTitle] = useState(props.title)
    const [perex, setPerex] = useState(props.perex)
    const [content, setContent] = useState(props.content)

    return (
        <div className={style.ArticleEditor}>
            <div>
                <label>Article title</label>
                <input
                    spellCheck={false}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Perex</label>
                <textarea
                    spellCheck={false}
                    rows={6}
                    value={perex}
                    onChange={(e) => setPerex(e.target.value)}
                />
            </div>
            <div>
                <label>Content</label>
                <textarea
                    spellCheck={false}
                    rows={60}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <div>
                <Button onClick={() => props.onSubmit(title, perex, content)}>Submit</Button>
            </div>
        </div>
    )
}
