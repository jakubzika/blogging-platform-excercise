import 'reflect-metadata'
import YAML from 'yaml'
import fs from 'fs'
import { createConnection } from 'typeorm'

import { Configuration } from './config'

const configuration: Configuration = YAML.parse(fs.readFileSync('../config.yml', 'utf8'))
const dbConfig = configuration.database

createConnection({
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [__dirname + '/entity/*.ts'],
    synchronize: true,
})
    .then((connection) => {
        console.log('started')
    })
    .catch((err) => {
        console.log(err)
    })
