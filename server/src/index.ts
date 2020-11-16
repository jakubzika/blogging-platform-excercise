import 'reflect-metadata'

import { Configuration } from './configuration'
Configuration.setLocation('../config.yml')

import { DatabaseProvider } from './services/database'

import { controllers } from './controllers'
import { Server } from './server'

async function main() {
    console.log('start')

    const server: Server = new Server(Configuration.getConfiguration().server, controllers)
    DatabaseProvider.getConnection()

    server.start()
    console.log('server running')
}
main()
