import { connect, ConnectedProps } from 'react-redux'
import { AppState } from '../redux/reducers'

import { getLoggedInUser } from '../selectors'

const mapStateToProps = (state: AppState) => ({
    loggedInUser: getLoggedInUser(state),
})

const mapDispatchToProps = (dispatch) => ({})

const authorizedUserConnector = connect(mapStateToProps, mapDispatchToProps)

export type AuthorizedUserConnectorProps = ConnectedProps<typeof authorizedUserConnector>

export { authorizedUserConnector }
