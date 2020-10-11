export type createArticleDTO = {
    title: string
    perex: string
    content: string
}

export type deleteArticleDTO = {
    id: number
}

export type editArticleDTO = {
    id: number
    title: string
    perex: string
    content: string
}

export type getArticlesDTO = {
    skip?: number
    take?: number
}
