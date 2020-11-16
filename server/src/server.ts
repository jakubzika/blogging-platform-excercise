import * as restify from 'restify'
import { Router } from './router'
import corsMiddleware from 'restify-cors-middleware'

import { HttpServerConfig } from './configuration'
import { RouteHandler } from './controllers/route'

/**
 * Server class
 */
export class Server {
    restify: restify.Server
    config: HttpServerConfig

    /**
     * Creates server instance
     *
     * @param  {HttpServerConfig} config, not pulled from singleton instance as we would lock ourselves to only having one instance of server class
     */
    constructor(config: HttpServerConfig, controllers: RouteHandler[]) {
        this.config = config

        this.restify = restify.createServer(config.options)

        this.addPlugins()

        controllers.forEach((h: RouteHandler) => {
            h.registerHandler(this.getRouter())
        })
    }
    /**
     * @returns Router
     */
    getRouter(): Router {
        return new Router(this.restify)
    }

    /**
     * Adds restify plugins to restify server instance
     *
     */
    addPlugins() {
        this.restify.use(restify.plugins.queryParser())
        this.restify.use(restify.plugins.bodyParser())

        const cors = corsMiddleware({
            preflightMaxAge: 5, //Optional
            origins: ['*'],
            allowHeaders: ['API-Token', 'Authorization'],
            exposeHeaders: ['API-Token-Expiry'],
        })

        this.restify.pre(cors.preflight)
        this.restify.use(cors.actual)
    }

    /**
     * Starts server
     */
    start() {
        this.restify.listen(this.config.port)
    }
}
