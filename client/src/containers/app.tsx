import {connect} from 'react-redux'
import React from 'react'
import {Route, Switch} from 'react-router'

import { testingAction } from '../redux/actions/app'
import {AppState} from '../redux/reducers/index'


import MainPage from './main'


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
                <Switch>
                    <Route path="/"><MainPage/></Route>
                    <Route path="/article/:id" ></Route>
                    <Route path="/profile" ></Route>
                    <Route path="/login" ></Route>
                </Switch>
                
            </div>
        )
    }
}

const mapStateToProps = (state:AppState) => ({
        message: state.app.message
    })


const mapDispatchToProps = dispatch => ({
    introduction: (arg: string) => {
        dispatch(testingAction(arg))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(App);