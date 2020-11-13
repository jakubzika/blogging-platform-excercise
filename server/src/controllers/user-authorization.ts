import { Next, Request, Response } from 'restify'
import errors from 'restify-errors'
import jwt from 'jsonwebtoken'

import { User } from '../entity/user'
import { RouteHandler } from './route'
import { Router } from '../router'
import { Configuration } from '../configuration'
import {
    UserManager,
    LoginCredentials,
    UserAuthenticationError,
    UserCreationObject,
    UserCreationError,
} from '../services/user-manager'
import { loginResponseDTO } from '../../../shared/dto/response-dto'
import { mapUserDTO } from '../lib/dto-mapper'

export interface JwtData {
    uid: number
    email: string
}

export class UserAuthorizationController implements RouteHandler {
    jwtSecret: string
    constructor() {
        this.jwtSecret = Configuration.getJwtSecret()
        console.log('jwtSecret', this.jwtSecret)
    }

    registerHandler(router: Router) {
        router.setBase('/user')

        router.post('/login', this.auth.bind(this))
        router.post('/', this.create.bind(this))
    }

    async auth(req: Request, res: Response, next: Next) {
        const login: LoginCredentials = req.body

        console.log(login)

        const result = await UserManager.authenticate(login)

        let response: loginResponseDTO

        if (result instanceof User) {
            console.log('success')
            const data: JwtData = {
                uid: result.id,
                email: result.email,
            }

            const token = jwt.sign(data, this.jwtSecret, {
                expiresIn: '2h',
            })
            response = {
                successful: true,
                token: token,
                user: mapUserDTO(result, false),
            }
            res.send(response)
            next()
        } else {
            if (
                result == UserAuthenticationError.NO_ACCOUNT_WITH_EMAIL ||
                result == UserAuthenticationError.PASSWORDS_DONT_MATCH
            ) {
                response = {
                    successful: false,
                }
                res.send(response)
                next()
            } else {
                next(new errors.InternalError(''))
            }
        }
    }

    async create(req: Request, res: Response, next: Next) {
        const creation: UserCreationObject = req.body
        console.log('creation', creation)

        try {
            const result = await UserManager.createuser(creation)
            if (result instanceof User) {
                res.send({ uid: result.id })
                next()
            } else {
                if (result == UserCreationError.USER_ALREADY_EXISTS) {
                    next(new errors.UnauthorizedError('Email already registered'))
                }
            }
        } catch {
            next(new errors.InternalServerError(''))
        }
    }
}
