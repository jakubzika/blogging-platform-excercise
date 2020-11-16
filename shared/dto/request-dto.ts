export type createArticleDTO = {
    title: string
    perex: string
    content: string
}

export type editArticleDTO = {
    title: string
    perex: string
    content: string
}

export type getArticlesDTO = {
    skip?: number
    take?: number
    includeCreator?: string
    fromUser?: number
}

export type getArticleDTO = {
    includeCreator?: string
    // includeComments?: string
    // includeVotes?: string
}

export type getCommentDTO = {
    includeUsers?: string
}

export type createCommentDTO = {
    content: string
}
