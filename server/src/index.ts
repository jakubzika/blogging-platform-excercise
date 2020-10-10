import 'reflect-metadata'

import { Configuration } from './configuration'
import { DatabaseProvider } from './database'

import { controllers } from './controllers'
import { Server } from './server'

async function main() {
    console.log('start')
    Configuration.setLocation('../config.yml')

    const server: Server = new Server(Configuration.getConfiguration().server, controllers)
    DatabaseProvider.getConnection()

    server.start()
    console.log('server running')
}
main()
