import { ArticleController } from './article'
import { UserLoginController } from './userLogin'
import { CommentController } from './comment'

export const controllers = [
    new ArticleController(),
    new UserLoginController(),
    new CommentController(),
]
