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
}
