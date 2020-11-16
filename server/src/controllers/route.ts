import { Server, RequestHandler } from 'restify'
import { Router } from '../router'

export interface RouteHandler {
    registerHandler(router: Router)
}
