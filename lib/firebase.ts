import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getDatabase, Database } from 'firebase-admin/database'

let app: App | null = null
let database: Database | null = null

export function getFirebaseDatabase(): Database {
    if (database) {
        return database
    }

    // Verifica se já existe uma app inicializada
    if (getApps().length === 0) {
        const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT

        if (!serviceAccount) {
            throw new Error(
                'Variável de ambiente FIREBASE_SERVICE_ACCOUNT não configurada. ' +
                'Ela deve conter o JSON da service account do Firebase (pode ser uma string JSON ou caminho para arquivo).'
            )
        }

        let serviceAccountObj: object

        try {
            // Tenta fazer parse do JSON (se for uma string JSON)
            serviceAccountObj = JSON.parse(serviceAccount)
        } catch {
            // Se falhar, assume que é um caminho para arquivo
            try {
                const fs = require('fs')
                const path = require('path')
                const serviceAccountPath = path.resolve(process.cwd(), serviceAccount)
                serviceAccountObj = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))
            } catch (error) {
                throw new Error(
                    'Não foi possível carregar as credenciais do Firebase. ' +
                    'Verifique se FIREBASE_SERVICE_ACCOUNT contém um JSON válido ou um caminho para arquivo válido.'
                )
            }
        }

        const databaseURL = process.env.FIREBASE_DATABASE_URL

        if (!databaseURL) {
            throw new Error(
                'Variável de ambiente FIREBASE_DATABASE_URL não configurada. ' +
                'Exemplo: https://seu-projeto-default-rtdb.firebaseio.com'
            )
        }

        app = initializeApp({
            credential: cert(serviceAccountObj as any),
            databaseURL: databaseURL
        })
    } else {
        app = getApps()[0]
    }

    database = getDatabase(app)
    return database
}

