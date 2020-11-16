import { Connection, createConnection } from 'typeorm'
import { DatabaseConfig, Configuration } from '../configuration'
import { entities } from '../entity'

/**
 * Database service
 * using singleton pattern
 */
export class DatabaseProvider {
    static connection: Connection

    /**
     * Initialization of database connection
     */
    static async initialize() {
        const config: DatabaseConfig = Configuration.getDatabaseConfig()
        DatabaseProvider.connection = await createConnection({
            type: 'postgres',
            host: config.host,
            port: config.port,
            username: config.username,
            password: config.password,
            database: config.database,
            entities: entities,
            synchronize: true,
        })
    }
    /**
     * @returns Promise with Connection database handler
     */
    static async getConnection(): Promise<Connection> {
        if (DatabaseProvider.connection) {
            return DatabaseProvider.connection
        }
        try {
            await DatabaseProvider.initialize()
            return DatabaseProvider.connection
        } catch (error) {
            throw new Error('could not initialize database connection: ' + error)
        }
    }
}
