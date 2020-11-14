import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Article as ArticleType, User, ArticleID } from '../types'
import { AppState } from '../redux/reducers'
import { loadArticles, loadArticle, loadComments } from '../redux/actions/app'

import { Article } from '../components/article'
import { Title } from '../components/title'

import style from '../assets/styles/containers.scss'
import { match } from 'react-router-dom'
import api from '../services/api'

const mapStateToProps = (state: AppState) => ({
    articles: state.app.articles,
    users: state.app.users,
})

const mapDispatchToProps = (dispatch) => ({
    loadArticles: () => dispatch(loadArticles()),
    loadArticle: (id, content, creator) => dispatch(loadArticle(id, content, creator)),
    loadComments: (articleId) => dispatch(loadComments(articleId)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type connectorProps = ConnectedProps<typeof connector>

type ArticlePageProps = connectorProps & {
    match: any
}

class ArticlePage extends React.Component<ArticlePageProps> {
    constructor(props: ArticlePageProps) {
        super(props)
        const articleId = props.match.params.id
        props.loadArticle(articleId, true, true)
    }

    render() {
        const { articles, users } = this.props

        const currentArticleId: number = Number(this.props.match.params.id)
        const article: ArticleType = articles[currentArticleId]
        const creator: User = article && users[article.creator]

        return (
            <div className={style.ArticlePage}>
                {/* <Title>Article {this.props.match.params.id}</Title> */}
                {article && (
                    <Article article={article} creator={creator} users={this.props.users} />
                )}
            </div>
        )
    }
}

export default connector(ArticlePage)
