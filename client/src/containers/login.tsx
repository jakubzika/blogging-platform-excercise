import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { AppState } from '../redux/reducers'
import { getLoggedInUser } from '../selectors'
import { Title } from '../components/title'

import style from '../assets/styles/containers.scss'
import { Login } from '../components/login'
import { login } from '../redux/actions/auth'
import { Redirect } from 'react-router-dom'
import { setLoadingState } from '../redux/actions/ui'
import { LoadingState } from '../types'

const mapStateToProps = (state: AppState) => ({
    loggedInUser: getLoggedInUser(state),
    loginLoadingState: state.ui.loginLoading,
})

const mapDispatchToProps = (dispatch) => ({
    loginUser: (email, password) => dispatch(login(email, password)),
    setLoginLoadingState: (loadingState: LoadingState) =>
        dispatch(setLoadingState(loadingState, 'loginLoading')),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type connectorProps = ConnectedProps<typeof connector>

type LoginPageProps = connectorProps & {
    match: any
}

class LoginPage extends React.Component<LoginPageProps> {
    constructor(props) {
        super(props)
        props.setLoginLoadingState(LoadingState.IDLE)
    }

    componentWillUnmount() {
        this.props.setLoginLoadingState(LoadingState.IDLE)
    }

    render() {
        return (
            <div className={style.LoginPage}>
                {this.props.loggedInUser ? (
                    <Redirect to="/" />
                ) : (
                    <Login
                        loginLoadingState={this.props.loginLoadingState}
                        loginUser={this.props.loginUser}
                    />
                )}
            </div>
        )
    }
}

export default connector(LoginPage)
