import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { AppState } from '../redux/reducers'

import { Title } from '../components/title'
import { loadArticles, loadArticle, editArticle } from '../redux/actions/app'
import { getLoggedInUser, getUsersArticles } from '../selectors'

import style from '../assets/styles/containers.scss'
import { ArticleEditor } from '../components/article-editor'
import { LoadingState } from '../types'

const mapStateToProps = (state: AppState) => ({
    loggedInUser: getLoggedInUser(state),
    articles: getUsersArticles(state),
    editArticleLodaingState: state.ui.articleEdit,
})

const mapDispatchToProps = (dispatch) => ({
    loadArticles: (userId) => dispatch(loadArticles({ fromUser: userId })),
    loadArticle: (articleId) => dispatch(loadArticle(articleId, true, true)),
    editArticle: (articleId, title, perex, content) =>
        dispatch(editArticle(articleId, title, perex, content)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type connectorProps = ConnectedProps<typeof connector>

type EditArticlePageprops = connectorProps & {
    match: any
}

type EditArticlePageState = {
    submitted: boolean
}

class EditArticlePage extends React.Component<EditArticlePageprops, EditArticlePageState> {
    constructor(props: EditArticlePageprops) {
        super(props)
        const articleId = props.match.params.id
        loadArticle(props.loadArticle(articleId))

        this.submitEditedArticle = this.submitEditedArticle.bind(this)
        this.state = {
            submitted: false,
        }
    }

    submitEditedArticle(title: string, perex: string, content: string) {
        console.log('saving the article')
        this.props.editArticle(this.props.match.params.id, title, perex, content)
        this.setState({
            submitted: true,
        })
    }

    render() {
        const articleId = this.props.match.params.id
        const article = this.props.articles[articleId]

        return (
            <div className={style.EditArticle}>
                <Title>Edit article {this.props.match.params.id}</Title>
                {!this.state.submitted && article && article.loaded && (
                    <ArticleEditor
                        content={article.content}
                        perex={article.perex}
                        title={article.title}
                        onSubmit={this.submitEditedArticle}
                    />
                )}
                {this.state.submitted &&
                    this.props.editArticleLodaingState === LoadingState.SUCCESS && (
                        <Redirect to={'/profile'} />
                    )}
            </div>
        )
    }
}

export default connector(EditArticlePage)
