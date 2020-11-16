import { Server, RequestHandler } from 'restify'
import restifyJwt from 'restify-jwt-community'
import { Configuration } from './configuration'

export interface RouterOptions {
    authentication?: Boolean
}
/**
 * Class extending
 */
export class Router {
    server: Server
    base: string
    jwtSecret: string

    /**
     * Constructor
     *
     * @param  {Server} server - restify server instance
     */
    constructor(server: Server) {
        this.server = server
        this.jwtSecret = Configuration.getJwtSecret()
    }

    /**
     *  Sets base url for route
     *
     * @param  {string} base - sets base url
     */
    setBase(base: string) {
        this.base = base
    }

    /**
     * Wrapper for restify.get with additional router logic
     *
     * @param  {string} path
     * @param  {RequestHandler|RequestHandler[]} handlers
     * @param  {RouterOptions={}} options
     */
    get(path: string, handlers: RequestHandler | RequestHandler[], options: RouterOptions = {}) {
        this.addRoute('get', path, handlers, options)
    }

    /**
     * Wrapper for restify.post with additional router logic
     *
     * @param  {string} path
     * @param  {RequestHandler|RequestHandler[]} handlers
     * @param  {RouterOptions={}} options
     */
    post(path: string, handlers: RequestHandler | RequestHandler[], options: RouterOptions = {}) {
        this.addRoute('post', path, handlers, options)
    }

    /**
     * Wrapper for restify.put with additional router logic
     *
     * @param  {string} path
     * @param  {RequestHandler|RequestHandler[]} handlers
     * @param  {RouterOptions={}} options
     */
    put(path: string, handlers: RequestHandler | RequestHandler[], options: RouterOptions = {}) {
        this.addRoute('put', path, handlers, options)
    }

    /**
     * Wrapper for restify.patch with additional router logic
     *
     * @param  {string} path
     * @param  {RequestHandler|RequestHandler[]} handlers
     * @param  {RouterOptions={}} options
     */
    patch(path: string, handlers: RequestHandler | RequestHandler[], options: RouterOptions = {}) {
        this.addRoute('patch', path, handlers, options)
    }

    /**
     * Wrapper for restify.del with additional router logic
     *
     * @param  {string} path
     * @param  {RequestHandler|RequestHandler[]} handlers
     * @param  {RouterOptions={}} options
     */
    del(path: string, handlers: RequestHandler | RequestHandler[], options: RouterOptions = {}) {
        this.addRoute('del', path, handlers, options)
    }

    /**
     * Private method which maps the Routers routes to Restify server routes
     *
     * @param  {'get'|'post'|'put'|'patch'|'del'} method
     * @param  {string} path
     * @param  {RequestHandler|RequestHandler[]} handler
     * @param  {RouterOptions} options
     */
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
