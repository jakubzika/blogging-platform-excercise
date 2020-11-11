import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    RelationId,
} from 'typeorm'

import { User } from './user'
import { Comment } from './comment'
import { Vote } from './vote'

@Entity()
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    perex: string

    @Column('text')
    content: string

    @CreateDateColumn()
    created: string

    @UpdateDateColumn()
    edited: string

    @ManyToOne(() => User, (user) => user.articles)
    creator: User

    @RelationId((article: Article) => article.creator)
    creatorId: number

    @OneToMany(() => Comment, (comment) => comment.article)
    comments: Comment[]

    @OneToMany(() => Vote, (vote) => vote.article)
    vote: Vote[]
}
