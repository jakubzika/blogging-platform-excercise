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
}

export type responseDTO = {
    response: getArticleResponseDTO | listArticlesResponseDTO // TODO: many more
}
