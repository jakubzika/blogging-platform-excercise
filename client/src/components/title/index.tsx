import React, { ReactChild } from 'react'
import style from './style.scss'

export interface TitleProps {
    children: ReactChild
}

export function Title({children}: TitleProps) {
    return (
        <h1 className={style.Title}>
            {children}
        </h1>
    )
}