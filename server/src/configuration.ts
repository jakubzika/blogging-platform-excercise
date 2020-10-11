import fs from 'fs'
import YAML from 'yaml'

export interface DatabaseConfig {
    host: string
    username: string
    password: string
    port: number
    database: string
}

export interface HttpServerConfig {
    options: {
        url: string
        certificate?: string
        key?: string
    }
    port: number
    jwtSecret: string
}

export interface Config {
    database: DatabaseConfig
    server: HttpServerConfig
}
/** Singleton class manageing server configuration */
export class Configuration {
    static config: Config
    static location: string

    /**
     * Sets path to the yaml file
     * @param  {string} path to the config
     * @returns void
     */
    public static setLocation(location: string): void {
        Configuration.location = location
    }
    /**
     * @returns Config
     */
    public static getConfiguration(): Config {
        if (Configuration.config) {
            return Configuration.config
        }

        if (!Configuration.location) {
            throw new Error('Configuration location not specified')
        }

        Configuration.config = YAML.parse(fs.readFileSync(Configuration.location, 'utf8'))
        return Configuration.config
    }
    /**
     * @returns DatabaseConfig
     */
    public static getDatabaseConfig(): DatabaseConfig {
        return Configuration.getConfiguration().database
    }
    /**
     * @returns jwt secret key
     */
    public static getJwtSecret(): string {
        return Configuration.getConfiguration().server.jwtSecret
    }
}
