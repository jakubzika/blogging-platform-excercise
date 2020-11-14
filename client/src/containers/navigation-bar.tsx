import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppState } from '../redux/reducers'
import { getLoggedInUser } from '../selectors'

import style from '../assets/styles/containers.scss'

const mapStateToProps = (state: AppState) => ({
    loggedInUser: getLoggedInUser(state),
})

const mapDispatchToProps = (dispatch) => ({
    // loginUser: () => dispatch(login)
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type connectorProps = ConnectedProps<typeof connector>

type NavigationBarProps = connectorProps & {
    // match: any
}

class NavigationBar extends React.Component<NavigationBarProps> {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={style.NavigationBar}>
                {this.props.loggedInUser
                    ? `logged in as ${this.props.loggedInUser.name}`
                    : 'not logged in'}
                <div>
                    <Link to="/login">Log in →</Link>
                </div>
            </div>
        )
    }
}

export default connector(NavigationBar)
