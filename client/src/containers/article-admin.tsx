import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { AppState } from '../redux/reducers'

import { Title } from '../components/title'
import { loadArticles } from '../redux/actions/app'
import { getLoggedInUser, getUsersArticles } from '../selectors'
import { ArticleAdminList } from '../components/article-admin-list'

import style from '../assets/styles/containers.scss'

const mapStateToProps = (state: AppState) => ({
    loggedInUser: getLoggedInUser(state),
    articles: getUsersArticles(state),
})

const mapDispatchToProps = (dispatch) => ({
    loadArticles: (userId) => dispatch(loadArticles({ fromUser: userId })),
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
        return (
            <div className={style.ArticleAdminList}>
                <Title>My articles</Title>
                <ArticleAdminList articles={this.props.articles} />
            </div>
        )
    }
}

export default connector(ArticleAdminPage)
