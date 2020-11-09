import {connect} from 'react-redux'
import React from 'react'
import { testingAction } from '../redux/actions/app'
import { State, AppState } from '../types'



export interface AppProps {
    message: String,
    introduction: (arg:string) => void
}

class App extends React.Component<AppProps> {
    constructor(props: AppProps) {
        console.log(props)
        super(props)
    }

    render() {
        return(
            <div>
                Blog test {this.props.message}
                <button onClick={() => this.props.introduction('testing')}>click me</button>
            </div>
        )
    }
}

const mapStateToProps = (state:AppState)  => {
    console.log(state)
    return ({
        message: state.app.message
    })
}

const mapDispatchToProps = dispatch => ({
    introduction: (arg: string) => {
        dispatch(testingAction(arg))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(App);