import { NextResponse } from 'next/server'
import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import { getDbPool } from '@/lib/mysql'

type ParametroSoloRow = {
    id: number
    ph: number
}

export async function GET() {
    try {
        const pool = getDbPool()
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT id, ph FROM parametro_solo ORDER BY id DESC'
        )

        return NextResponse.json(
            rows.map((row) => ({
                id: row.id,
                ph: Number(row.ph)
            }))
        )
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

        const pool = getDbPool()
        const [result] = await pool.execute<ResultSetHeader>(
            'INSERT INTO parametro_solo (ph) VALUES (?)',
            [body.ph]
        )

        return NextResponse.json(
            {
                id: result.insertId,
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

