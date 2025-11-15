import mysql, { Pool } from 'mysql2/promise'

let pool: Pool | null = null

function parseDatabaseUrl(urlString: string) {
    const url = new URL(urlString)

    return {
        host: url.hostname,
        port: Number(url.port || '3306'),
        user: decodeURIComponent(url.username),
        password: decodeURIComponent(url.password),
        database: url.pathname.replace(/^\//, '')
    }
}

export function getDbPool() {
    const dbUrl = process.env.DATABASE_URL

    const credentials = dbUrl
        ? parseDatabaseUrl(dbUrl)
        : {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT ?? '3306'),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        }

    const { host, port, user, password, database } = credentials

    if (!host || !user || !password || !database) {
        throw new Error('Variáveis de ambiente do MySQL não configuradas (DATABASE_URL ou DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)')
    }

    if (!pool) {
        pool = mysql.createPool({
            host,
            port,
            user,
            password,
            database,
            waitForConnections: true,
            connectionLimit: 5,
            maxIdle: 5,
            idleTimeout: 60000,
            queueLimit: 0
        })
    }

    return pool
}

