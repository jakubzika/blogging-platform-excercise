export type commentDTO = {
    id: number
    article: number | articleDTO
    creator: number | userDTO
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
    creator: number | userDTO
    created: string
    comments: commentDTO[]
}

export type listArticlesResponseDTO = {
    articles: articleDTO[]
}

export type getArticleResponseDTO = {
    article: articleDTO
}

export type responseDTO = {
    response: getArticleResponseDTO | listArticlesResponseDTO // TODO: many more
}
