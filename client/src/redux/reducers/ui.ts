import { AppActionType, SET_LOADING_STATE } from '../actions/types'
import { LoadingState } from '../../types'

export interface UIState {
    loginLoading: LoadingState
    newCommentLoading: LoadingState
    newArticleLoading: LoadingState
    articlesLoading: LoadingState
    articleEdit: LoadingState
    articleCreate: LoadingState
    articleDelete: LoadingState
}

const initialUIState: UIState = {
    loginLoading: LoadingState.IDLE,
    newCommentLoading: LoadingState.IDLE,
    newArticleLoading: LoadingState.IDLE,
    articlesLoading: LoadingState.IDLE,
    articleEdit: LoadingState.IDLE,
    articleCreate: LoadingState.IDLE,
    articleDelete: LoadingState.IDLE,
}

export default function uiReducer(state: UIState = initialUIState, action: AppActionType): UIState {
    switch (action.type) {
        case SET_LOADING_STATE:
            return {
                ...state,
                [action.kind]: action.loadingState,
            }
        default:
            return state
    }
}
