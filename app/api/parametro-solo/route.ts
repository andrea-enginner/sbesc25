import { NextResponse } from 'next/server'
import { getFirebaseDatabase } from '@/lib/firebase'

type ParametroSolo = {
    id: string
    ph: number
    nitrogenio?: number
    fosforo?: number
    potassio?: number
    temperatura?: number
    umidade?: number
    dataHora?: string
    timestamp?: number
}

export async function GET() {
    try {
        const db = getFirebaseDatabase()

        // Primeiro tenta buscar de 'sensor' (estrutura existente no Firebase)
        let ref = db.ref('sensor')
        let snapshot = await ref.limitToLast(100).once('value')
        let data = snapshot.val()

        // Se não encontrar em 'sensor', tenta 'parametro_solo' (nova estrutura)
        if (!data) {
            ref = db.ref('parametro_solo')
            snapshot = await ref.limitToLast(100).once('value')
            data = snapshot.val()
        }

        if (!data) {
            return NextResponse.json([])
        }

        // Converte o objeto do Firebase em array
        const registros: ParametroSolo[] = Object.entries(data)
            .map(([id, value]: [string, any]) => {
                // Suporta tanto a estrutura antiga (sensor) quanto a nova (parametro_solo)
                const ph = value.pH !== undefined ? Number(value.pH) : Number(value.ph)
                const timestamp = value.timestamp || (value.dataHora ? new Date(value.dataHora).getTime() : 0)

                return {
                    id,
                    ph: isNaN(ph) ? 0 : ph, // Garante que sempre tem um número
                    nitrogenio: value.nitrogenio !== undefined ? Number(value.nitrogenio) : undefined,
                    fosforo: value.fosforo !== undefined ? Number(value.fosforo) : undefined,
                    potassio: value.potassio !== undefined ? Number(value.potassio) : undefined,
                    temperatura: value.temperatura !== undefined ? Number(value.temperatura) : undefined,
                    umidade: value.umidade !== undefined ? Number(value.umidade) : undefined,
                    dataHora: value.dataHora,
                    timestamp
                }
            })
            .filter(reg => reg.ph > 0) // Remove registros sem pH válido
            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))

        return NextResponse.json(registros)
    } catch (error) {
        console.error('Erro ao buscar dados de parametro_solo', error)
        return NextResponse.json(
            {
                message: 'Não foi possível recuperar os dados',
                detail: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => null)

        if (!body || typeof body.ph !== 'number' || Number.isNaN(body.ph)) {
            return NextResponse.json(
                { message: 'O campo ph é obrigatório e deve ser numérico' },
                { status: 400 }
            )
        }

        const db = getFirebaseDatabase()
        const ref = db.ref('parametro_solo')

        const novoRegistro = {
            ph: body.ph,
            timestamp: Date.now()
        }

        const snapshot = await ref.push(novoRegistro)
        const id = snapshot.key

        if (!id) {
            throw new Error('Não foi possível obter o ID do registro criado')
        }

        return NextResponse.json(
            {
                id,
                ph: body.ph
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Erro ao inserir dados em parametro_solo', error)
        return NextResponse.json(
            {
                message: 'Não foi possível salvar os dados',
                detail: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        )
    }
}

