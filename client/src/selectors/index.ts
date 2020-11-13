import { createSelector } from 'reselect'
import { AppState } from '../redux/reducers'
import { User, UserID } from '../types'
import { loginStateEnum } from '../redux/reducers/auth'

const getUsers = (state: AppState): { [key: number]: User } => state.app.users
const getLoggedInUserId = (state: AppState): UserID => state.auth.userId
const getLoginState = (state: AppState): loginStateEnum => state.auth.state

export const getLoggedInUser = createSelector(
    [getUsers, getLoginState, getLoggedInUserId],
    (users, loginState, userId): User | null => {
        if (loginState == loginStateEnum.LOGGED_IN) {
            return users[userId]
        } else {
            return null
        }
    }
)
