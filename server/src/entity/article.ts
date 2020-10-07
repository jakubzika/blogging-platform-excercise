import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'

import { User } from './user'
import { Comment } from './comment'
import { Vote } from './vote'

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    perex: string

    @Column('text')
    content: string

    @Column('timestamp')
    timestamp: string

    @ManyToOne(() => User, (user) => user.articles)
    creator: User

    @OneToMany(() => Comment, (comment) => comment.article)
    comments: Comment[]

    @OneToMany(() => Vote, (vote) => vote.article)
    vote: Vote
}
