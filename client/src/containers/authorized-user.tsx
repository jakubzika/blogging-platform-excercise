import { connect, ConnectedProps } from 'react-redux'
import { AppState } from '../redux/reducers'

import { getLoggedInUser } from '../selectors'
import { login, logout } from '../redux/actions/auth'

const mapStateToProps = (state: AppState) => ({
    loggedInUser: getLoggedInUser(state),
    loginState: state.auth.state,
})

const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => dispatch(login(email, password)),
    logout: () => dispatch(logout()),
})

const authorizedUserConnector = connect(mapStateToProps, mapDispatchToProps)

export type AuthorizedUserConnectorProps = ConnectedProps<typeof authorizedUserConnector>

export { authorizedUserConnector }
