import React from 'react'

import {
    authorizedUserConnector,
    AuthorizedUserConnectorProps,
} from '../../containers/authorized-user'
import { Route, RouteProps, Redirect } from 'react-router-dom'
import { loginStateEnum } from '../../redux/reducers/auth'

export type ProtectedRouteProps = {} & AuthorizedUserConnectorProps & RouteProps

function protectedRoute({ component, loginState, loggedInUser, ...rest }: ProtectedRouteProps) {
    if (loginState == loginStateEnum.LOADING) {
        return <div></div>
    } else if (loggedInUser !== null) {
        return <Route {...rest} component={component} />
    } else {
        return <Redirect to={'/'} />
    }
}

export const ProtectedRoute = authorizedUserConnector(protectedRoute)
