import { ArticleController } from './article'
import { UserController } from './user'
import { CommentController } from './comment'

export const controllers = [new ArticleController(), new UserController(), new CommentController()]
