import React, { ReactChild } from 'react'

import style from './style.scss'

export interface ButtonProps {
    children: ReactChild | ReactChild[]
    onClick: () => any
}

export function Button({ children, onClick }: ButtonProps) {
    return (
        <button className={style.Button} onClick={onClick}>
            {children}
        </button>
    )
}
