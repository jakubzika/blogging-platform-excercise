import fs from 'fs'
import YAML from 'yaml'

export interface DatabaseConfiguration {
    host: string
    username: string
    password: string
    port: number
    database: string
}

export interface Config {
    database: DatabaseConfiguration
}

export class Configuration {
    static config: Config
    static location: string

    public static setLocation(location: string): void {
        Configuration.location = location
    }

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
}
