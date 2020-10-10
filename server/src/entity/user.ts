import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm'

import { Article } from './article'
import { Comment } from './comment'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Article, (article) => article.creator)
    articles: Article[]

    @OneToMany(() => Comment, (comment) => comment.creator)
    comments: Comment[]
}
