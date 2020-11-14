import React from 'react'

import {
    authorizedUserConnector,
    AuthorizedUserConnectorProps,
} from '../../containers/authorized-user'
import { Route, RouteProps, Redirect } from 'react-router-dom'

export type ProtectedRouteProps = {} & AuthorizedUserConnectorProps & RouteProps

function protectedRoute({ component, loggedInUser, ...rest }: ProtectedRouteProps) {
    if (loggedInUser !== null) {
        return <Route {...rest} component={component} />
    } else {
        return <Redirect to={'/'} />
    }
}

export const ProtectedRoute = authorizedUserConnector(protectedRoute)
