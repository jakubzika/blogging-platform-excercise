import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne } from 'typeorm'

import { Article } from './article'

export enum VoteType {
    POSITIVE = 1,
    NEGATIVE = -1,
}

@Entity()
export class Vote {
    @PrimaryColumn()
    ip: string

    // TODO: figure out how to make this column also the PrimaryKey
    @ManyToOne(() => Article, (article) => article.vote)
    article: Article

    @Column({
        type: 'enum',
        enum: VoteType,
        default: VoteType.POSITIVE,
    })
    vote: VoteType
}
