import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { AppState } from '../redux/reducers'

import { Title } from '../components/title'
import { loadArticles, loadArticle } from '../redux/actions/app'
import { getLoggedInUser, getUsersArticles } from '../selectors'
import { ArticleAdminList } from '../components/article-admin-list'

import style from '../assets/styles/containers.scss'
import { ArticleAdmin } from '../components/article-admin'

const mapStateToProps = (state: AppState) => ({
    loggedInUser: getLoggedInUser(state),
    articles: getUsersArticles(state),
})

const mapDispatchToProps = (dispatch) => ({
    loadArticles: (userId) => dispatch(loadArticles({ fromUser: userId })),
    loadArticle: (articleId) => dispatch(loadArticle(articleId, true, true)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type connectorProps = ConnectedProps<typeof connector>

type ArticleAdminPageprops = connectorProps & {}

class ArticleAdminPage extends React.Component<ArticleAdminPageprops> {
    constructor(props: ArticleAdminPageprops) {
        super(props)
        loadArticles(props.loadArticles(props.loggedInUser.id))
    }

    render() {
        const articles = Object.values(this.props.articles).sort(
            (a: any, b: any) => b.created - a.created
        )

        return (
            <div className={style.ArticleAdminList}>
                <ArticleAdmin
                    articles={Object.values(articles)}
                    loadArticle={this.props.loadArticle}
                />
            </div>
        )
    }
}

export default connector(ArticleAdminPage)
