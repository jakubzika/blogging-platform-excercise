import * as restify from 'restify'
import { Router } from './router'

import { HttpServerConfig } from './configuration'
import { RouteHandler } from './controllers/route'

export class Server {
    private restify: restify.Server
    private config: HttpServerConfig

    /**
     * @param  {HttpServerConfig} config, not pulled from singleton instance as we would lock ourselves to only having one instance of server class
     */
    public constructor(config: HttpServerConfig, controllers: RouteHandler[]) {
        this.config = config

        this.restify = restify.createServer(config.options)
        this.addPlugins()

        controllers.forEach((h: RouteHandler) => {
            h.registerHandler(this.getRouter())
        })
    }

    getRouter(): Router {
        return new Router(this.restify)
    }

    private addPlugins() {
        this.restify.use(restify.plugins.queryParser())
    }

    /**
     * starts server
     */
    public start() {
        this.restify.listen(this.config.port)
    }
}
