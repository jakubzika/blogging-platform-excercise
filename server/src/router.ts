import { Server, RequestHandler } from 'restify'
import restifyJwt from 'restify-jwt-community'
import { Configuration } from './configuration'

export interface RouterOptions {
    authentication?: Boolean
}

export class Router {
    server: Server
    base: string
    jwtSecret: string

    constructor(server: Server) {
        this.server = server
        this.jwtSecret = Configuration.getJwtSecret()
    }

    setBase(base: string) {
        this.base = base
    }

    get(path: string, handlers: RequestHandler | RequestHandler[], options: RouterOptions = {}) {
        this.addRoute('get', path, handlers, options)
    }
    post(path: string, handlers: RequestHandler | RequestHandler[], options: RouterOptions = {}) {
        this.addRoute('post', path, handlers, options)
    }
    put(path: string, handlers: RequestHandler | RequestHandler[], options: RouterOptions = {}) {
        this.addRoute('put', path, handlers, options)
    }
    patch(path: string, handlers: RequestHandler | RequestHandler[], options: RouterOptions = {}) {
        this.addRoute('patch', path, handlers, options)
    }
    del(path: string, handlers: RequestHandler | RequestHandler[], options: RouterOptions = {}) {
        this.addRoute('del', path, handlers, options)
    }

    // post(path: string, ...handlers: RequestHandler[]) {
    //     this.addRoute('post', path, handlers)
    // }
    // put(path: string, ...handlers: RequestHandler[]) {
    //     this.addRoute('put', path, handlers)
    // }
    // patch(path: string, ...handlers: RequestHandler[]) {
    //     this.addRoute('patch', path, handlers)
    // }
    // del(path: string, ...handlers: RequestHandler[]) {
    //     this.addRoute('del', path, handlers)
    // }

    authPlugin

    private addRoute(
        method: 'get' | 'post' | 'put' | 'patch' | 'del',
        path: string,
        handler: RequestHandler | RequestHandler[],
        options: RouterOptions
    ) {
        let handlers: RequestHandler[]
        if (Array.isArray(handler)) {
            handlers = handler
        } else {
            handlers = [handler]
        }

        if (options.authentication) {
            handlers.unshift(restifyJwt({ secret: this.jwtSecret }))
        }

        this.server[method](`${this.base}${path}`, handlers)
    }
}
