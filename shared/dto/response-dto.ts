export type commentDTO = {
    id: number
    article: number
    creator: number
    content: string
    created: string
}

export type userDTO = {
    id: number
    name: string
    email?: string
}

export type articleDTO = {
    id: number
    title: string
    perex: string
    content?: string
    creator: number
    created: string
    edited?: string
    comments: commentDTO[]
    votes: number
}

export type listArticlesResponseDTO = {
    articles: articleDTO[]
    creators?: userDTO[]
}

export type getArticleResponseDTO = {
    article: articleDTO
    creator?: userDTO
}

export type getCommentsResponseDTO = {
    comments: commentDTO[]
    users?: userDTO[]
}

export type loginResponseDTO = {
    successful: boolean
    token?: string
    user?: userDTO
}

export type authorizedUserdResponseDTO = {
    user: userDTO
}

export type responseDTO = {
    response: getArticleResponseDTO | listArticlesResponseDTO // TODO: many more
}

export type createCommentResponseDTO = {
    comment: commentDTO
}

export type createArticleResponseDTO = {
    success: boolean
    article?: articleDTO
}

export type editArticleResponseDTO = {
    success: boolean
    article?: articleDTO
}

export type deleteArticleResponseDTO = {
    success: boolean
}
