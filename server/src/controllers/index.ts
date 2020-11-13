import { ArticleController } from './article'
import { UserAuthorizationController } from './user-authorization'
import { CommentController } from './comment'

export const controllers = [
    new ArticleController(),
    new UserAuthorizationController(),
    new CommentController(),
]
