import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    ManyToOne,
    BaseEntity,
    CreateDateColumn,
    RelationId,
} from 'typeorm'

import { Article } from './article'
import { User } from './user'

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    // TODO: figure out how to make this column also the PrimaryKey
    @ManyToOne(() => Article, (article) => article.comments, { onDelete: 'CASCADE' })
    article: Article

    @RelationId((comment: Comment) => comment.article)
    articleId: number

    @ManyToOne(() => User, (user) => user.comments)
    creator: User

    @RelationId((comment: Comment) => comment.creator)
    creatorId: number

    @Column('text')
    content: string

    @CreateDateColumn()
    created: string
}
