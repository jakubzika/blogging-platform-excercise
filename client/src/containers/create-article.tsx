import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { AppState } from '../redux/reducers'

import { Title } from '../components/title'
import { loadArticles, loadArticle, createArticle } from '../redux/actions/app'
import { getLoggedInUser, getUsersArticles } from '../selectors'
import { Redirect } from 'react-router-dom'

import style from '../assets/styles/containers.scss'
import { ArticleEditor } from '../components/article-editor'
import { LoadingState } from '../types'

const mapStateToProps = (state: AppState) => ({
    loggedInUser: getLoggedInUser(state),
    articles: getUsersArticles(state),
    createArticleLoadingState: state.ui.articleCreate,
})

const mapDispatchToProps = (dispatch) => ({
    loadArticles: (userId) => dispatch(loadArticles({ fromUser: userId })),
    loadArticle: (articleId) => dispatch(loadArticle(articleId, true, true)),
    createArticle: (title: string, perex: string, content: string) =>
        dispatch(createArticle(title, perex, content)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type connectorProps = ConnectedProps<typeof connector>

type CreateArticlePageprops = connectorProps & {}

type CreateArticleState = {
    submitted: boolean
}

class CreateArticlePage extends React.Component<CreateArticlePageprops, CreateArticleState> {
    constructor(props: CreateArticlePageprops) {
        super(props)
        this.submitCreatedArticle = this.submitCreatedArticle.bind(this)
        this.state = {
            submitted: false,
        }
    }

    submitCreatedArticle(title: string, perex: string, content: string) {
        this.props.createArticle(title, perex, content)
        this.setState({
            submitted: true,
        })
    }

    render() {
        return (
            <div className={style.CreateArticle}>
                {!this.state.submitted && (
                    <div>
                        <Title>Create article</Title>
                        <ArticleEditor
                            content={''}
                            perex={''}
                            title={''}
                            onSubmit={this.submitCreatedArticle}
                        />
                    </div>
                )}
                {this.state.submitted &&
                    this.props.createArticleLoadingState === LoadingState.SUCCESS && (
                        <Redirect to={'/'} />
                    )}
            </div>
        )
    }
}

export default connector(CreateArticlePage)
