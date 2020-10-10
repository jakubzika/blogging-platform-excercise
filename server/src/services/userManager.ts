import bcrypt from 'bcrypt'

import { User } from '../entity/user'

// substitute for DTO
export interface UserCreationObject {
    name: string
    email: string
    password: string
}

// substitute for DTO
export interface LoginCredentials {
    email: string
    password: string
}

export enum UserCreationError {
    USER_ALREADY_EXISTS,
    UNKNWON_ERROR,
}

export enum UserAuthenticationError {
    NO_ACCOUNT_WITH_EMAIL,
    PASSWORDS_DONT_MATCH,
    UNKNWON_ERROR,
}

// TODO : error handling
export class UserManager {
    static async createuser(
        userCreationObject: UserCreationObject
    ): Promise<User | UserCreationError> {
        // logic for duplicity
        const usersWithSameEmail: User[] = await User.find({ email: userCreationObject.email })
        if (usersWithSameEmail.length > 0) {
            return UserCreationError.USER_ALREADY_EXISTS
        }

        const hashedPassword = await bcrypt.hash(userCreationObject.password, 12)

        const user = new User()
        user.articles = []
        user.comments = []
        user.email = userCreationObject.email
        user.name = userCreationObject.email
        user.password = hashedPassword

        return await User.save(user)
    }

    static async authenticate(login: LoginCredentials): Promise<User | UserAuthenticationError> {
        const user = await User.findOne({ email: login.email })
        if (user === undefined) {
            return UserAuthenticationError.NO_ACCOUNT_WITH_EMAIL
        }

        const succesfull: Boolean = await bcrypt.compare(login.password, user.password)

        if (succesfull) {
            return user
        } else {
            return UserAuthenticationError.PASSWORDS_DONT_MATCH
        }
    }
}
