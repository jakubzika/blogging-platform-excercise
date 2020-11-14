import React, { useState } from 'react'

import { Title } from '../title'

import style from './style.scss'
import { Button } from '../button'
import { LoadingState } from '../../types'

export interface LoginProps {
    loginLoadingState: LoadingState
    loginUser: (email: string, password: string) => void
}

export function Login({ loginLoadingState, loginUser }: LoginProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <div className={style.LoginInputContainer}>
                <Title>Log In</Title>
                {loginLoadingState}
                <div className={style.InputGroup}>
                    <label>Email</label>
                    <input type={'email'} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={style.InputGroup}>
                    <label>Password</label>
                    <input
                        id="login-password-input"
                        type={'password'}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={style.LoginButton}>
                    <Button onClick={() => loginUser(email, password)}>Log In</Button>
                </div>
            </div>
        </div>
    )
}
