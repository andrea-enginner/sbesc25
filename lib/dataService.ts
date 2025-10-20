import { supabase } from './supabase'

export interface SoloData {
    id_dispositivo: string
    data_hora: string
    ph: number
    condutividade_eletrica: number
    temperatura_solo: number
    umidade_solo: number
    nitrogenio: number
    fosforo: number
    potassio: number
}

export interface ClimateData {
    id_dispositivo: string
    data_hora: string
    chuva: number
    temperatura_ar: number
    umidade_ar: number
    radiacao_solar: number
}

export const dataService = {
    // Enviar dados do solo
    async insertSoloData(data: SoloData) {
        const { data: result, error } = await supabase
            .from('parametros_solo')
            .insert([data])
            .select()

        if (error) throw error
        return result
    },

    // Enviar dados climáticos
    async insertClimateData(data: ClimateData) {
        const { data: result, error } = await supabase
            .from('parametros_climaticos')
            .insert([data])
            .select()

        if (error) throw error
        return result
    },

    // Buscar dados do solo por dispositivo
    async getSoloData(deviceId?: string, limit = 50) {
        let query = supabase
            .from('parametros_solo')
            .select('*')
            .order('data_hora', { ascending: false })

        if (deviceId) {
            query = query.eq('id_dispositivo', deviceId)
        }

        const { data, error } = await query.limit(limit)

        if (error) throw error
        return data
    },

    // Buscar dados climáticos por dispositivo
    async getClimateData(deviceId?: string, limit = 50) {
        let query = supabase
            .from('parametros_climaticos')
            .select('*')
            .order('data_hora', { ascending: false })

        if (deviceId) {
            query = query.eq('id_dispositivo', deviceId)
        }

        const { data, error } = await query.limit(limit)

        if (error) throw error
        return data
    },

    // Buscar dispositivos cadastrados
    async getDevices() {
        const { data, error } = await supabase
            .from('dispositivos')
            .select('*')
            .eq('ativo', true)
            .order('data_cadastro', { ascending: false })

        if (error) throw error
        return data
    }
}
