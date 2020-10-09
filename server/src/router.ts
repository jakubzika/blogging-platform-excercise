import { Server, RequestHandler } from 'restify'

export class Router {
    server: Server
    base: string

    constructor(server: Server, base: string) {
        this.server = server
        this.base = base
    }

    get(path: string, ...handlers: RequestHandler[]) {
        this.addRoute('get', path, handlers)
    }
    post(path: string, ...handlers: RequestHandler[]) {
        this.addRoute('post', path, handlers)
    }
    put(path: string, ...handlers: RequestHandler[]) {
        this.addRoute('put', path, handlers)
    }
    patch(path: string, ...handlers: RequestHandler[]) {
        this.addRoute('patch', path, handlers)
    }
    del(path: string, ...handlers: RequestHandler[]) {
        this.addRoute('del', path, handlers)
    }

    private addRoute(
        method: 'get' | 'post' | 'put' | 'patch' | 'del',
        path: string,
        handlers: RequestHandler[]
    ) {
        this.server[method](`${this.base}${path}`, ...handlers)
    }
}
