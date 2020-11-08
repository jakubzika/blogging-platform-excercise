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

export interface JwtData {
    uid: number
    email: string
}

export class UserLoginController implements RouteHandler {
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

        const result = await UserManager.authenticate(login)
        if (result instanceof User) {
            const data: JwtData = {
                uid: result.id,
                email: result.email,
            }

            const token = jwt.sign(data, this.jwtSecret, {
                expiresIn: '2h',
            })

            res.send({ token })
            next()
        } else {
            if (
                result == UserAuthenticationError.NO_ACCOUNT_WITH_EMAIL ||
                result == UserAuthenticationError.PASSWORDS_DONT_MATCH
            )
                next(new errors.InvalidCredentialsError('Invalid email or password'))
            else {
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
                    next(new errors.InvalidCredentialsError('Email already registered'))
                }
            }
        } catch {
            next(new errors.InternalServerError(''))
        }
    }
}
