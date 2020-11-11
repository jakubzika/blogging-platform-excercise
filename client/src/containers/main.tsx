import React from 'react'
import {connect, ConnectedProps} from 'react-redux'
import { Article, User, ArticleID } from '../types'
import { AppState } from '../redux/reducers'
import { loadArticles, loadArticle } from '../redux/actions/app'
import { ArticleTitleList } from '../components/article-title-list/index'



const mapStateToProps = (state: AppState) => ({
    articles: state.app.articles,
    users: state.app.users
})

const mapDispatchToProps = dispatch => ({
    loadArticles: () => dispatch(loadArticles()),
    loadArticle: (id, content, creator) => dispatch(loadArticle(id,content,creator))
})

const connector = connect(mapStateToProps,mapDispatchToProps)

type connectorProps = ConnectedProps<typeof connector>

type  MainPageProps = connectorProps &  {
    
}


class MainPage extends React.Component<MainPageProps> {
    constructor(props: MainPageProps) {
        super(props)
        props.loadArticles()
    }

    render() {
        return(<div>main page

            <ArticleTitleList loadArticle={this.props.loadArticle} articles={Object.values(this.props.articles)} users={this.props.users}/>
        </div>)
    }
}

export default connector(MainPage)