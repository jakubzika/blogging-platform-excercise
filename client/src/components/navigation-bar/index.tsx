import React from 'react'
import {
    authorizedUserConnector,
    AuthorizedUserConnectorProps,
} from '../../containers/authorized-user'
import { User } from '../../types'

import { FiUser } from 'react-icons/fi'

import style from './style.scss'
import { Link } from 'react-router-dom'

export type NavigationBarProps = AuthorizedUserConnectorProps & {}

export function navigationBar({ loggedInUser, logout }: NavigationBarProps) {
    const loggedIn = loggedInUser !== null

    return (
        <div className={style.NavigationBar}>
            <div className={style.LeftSide}>
                <Link to={'/'}>Recent articles</Link>
            </div>
            <div className={style.RightSide}>
                {loggedIn && (
                    <span>
                        <Link className={style.Link} to="/profile">
                            My articles
                        </Link>
                        <Link className={style.Link} to="/profile/create-article">
                            Create article
                        </Link>
                    </span>
                )}
                {loggedIn && (
                    <span>
                        <FiUser />
                        {loggedInUser.name}
                    </span>
                )}
                {!loggedIn ? (
                    <Link to="/login">Log in →</Link>
                ) : (
                    <div>
                        <a onClick={logout} href="#">
                            logout
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

export const NavigationBar = authorizedUserConnector(navigationBar)
8
