import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Article, User, ArticleID } from '../types'
import { AppState } from '../redux/reducers'
import { loadArticles, loadArticle } from '../redux/actions/app'
import { ArticlePreviewList } from '../components/article-preview-list/index'
import { Title } from '../components/title'

import style from '../assets/styles/containers.scss'

const mapStateToProps = (state: AppState) => ({
    articles: state.app.articles,
    users: state.app.users,
})

const mapDispatchToProps = (dispatch) => ({
    loadArticles: () => dispatch(loadArticles()),
    loadArticle: (id, content, creator) => dispatch(loadArticle(id, content, creator)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type connectorProps = ConnectedProps<typeof connector>

type MainPageProps = connectorProps & {}

class MainPage extends React.Component<MainPageProps> {
    constructor(props: MainPageProps) {
        super(props)
        props.loadArticles()
    }

    render() {
        const sortedArticlesByDate: Article[] = Object.values(this.props.articles).sort(
            (a: any, b: any) => b.created - a.created
        )

        return (
            <div className={style.MainPage}>
                <Title>Recent articles</Title>
                <ArticlePreviewList
                    loadArticle={this.props.loadArticle}
                    articles={sortedArticlesByDate}
                    users={this.props.users}
                />
            </div>
        )
    }
}

export default connector(MainPage)
