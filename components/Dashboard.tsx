'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Droplets, Thermometer, RefreshCw, Leaf } from 'lucide-react'

interface ParametrosSolo {
    id: string
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

export default function Dashboard() {
    const [parametrosSolo, setParametrosSolo] = useState<ParametrosSolo[]>([])
    const [loading, setLoading] = useState(true)
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

    const loadSoilData = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('parametros_solo')
                .select('*')
                .order('data_hora', { ascending: false })
                .limit(20)

            if (error) throw error

            setParametrosSolo(data ?? [])
            setLastUpdate(new Date())
        } catch (err) {
            console.error('❌ Erro ao buscar dados do solo:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadSoilData()
        const interval = setInterval(loadSoilData, 30000)
        return () => clearInterval(interval)
    }, [loadSoilData])

    const latestSolo = parametrosSolo[0]

    if (loading) {
        return (
            <section className="py-20 px-4 bg-[#107869] text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-4">
                        <div className="mx-auto h-12 w-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm uppercase tracking-wide">Carregando dados de solo...</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-20 px-4 bg-[#107869] text-white">
            <div className="max-w-7xl mx-auto space-y-12">
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <h2 className="text-4xl font-bold">Monitoramento do Solo</h2>
                        <p className="text-white/80 max-w-2xl mt-2">
                            Leituras consolidadas de pH, condutividade elétrica, temperatura, umidade e nutrientes coletados pelos dispositivos em campo.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {lastUpdate && (
                            <p className="text-sm text-white/80">
                                Última atualização: <span className="text-white">{lastUpdate.toLocaleTimeString('pt-BR')}</span>
                            </p>
                        )}
                        <button
                            type="button"
                            onClick={() => {
                                setLoading(true)
                                loadSoilData()
                            }}
                            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide bg-white/10 border border-white/20 px-4 py-2 rounded-lg hover:bg-white/20 transition"
                        >
                            <RefreshCw className="w-4 h-4" /> Atualizar agora
                        </button>
                    </div>
                </header>

                <div className="bg-[#1A5653] border border-white/10 rounded-xl p-6 shadow-lg shadow-black/20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-white/10 p-3 rounded-lg">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">Última medição registrada</h3>
                            <p className="text-sm text-white/80">
                                {latestSolo ? `Coletada em ${new Date(latestSolo.data_hora).toLocaleString('pt-BR')} pelo dispositivo ${latestSolo.id_dispositivo}` : 'Nenhum dado disponível'}
                            </p>
                        </div>
                    </div>

                    {latestSolo ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center">
                                <p className="text-sm text-white/70">pH</p>
                                <p className="text-3xl font-semibold text-white">{latestSolo.ph ?? '--'}</p>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center">
                                <p className="text-sm text-white/70">Cond. Elétrica</p>
                                <p className="text-3xl font-semibold text-white">{latestSolo.condutividade_eletrica ?? '--'}</p>
                                <span className="text-xs uppercase tracking-wide text-white/60">mS/cm</span>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <Thermometer className="w-4 h-4 text-white" />
                                    <p className="text-sm text-white/70">Temperatura do Solo</p>
                                </div>
                                <p className="text-3xl font-semibold text-white">{latestSolo.temperatura_solo ?? '--'}°C</p>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <Droplets className="w-4 h-4 text-white" />
                                    <p className="text-sm text-white/70">Umidade do Solo</p>
                                </div>
                                <p className="text-3xl font-semibold text-white">{latestSolo.umidade_solo ?? '--'}%</p>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center sm:col-span-2 lg:col-span-1">
                                <p className="text-sm text-white/70">Nitrogênio</p>
                                <p className="text-2xl font-semibold text-white">{latestSolo.nitrogenio ?? '--'} mg/kg</p>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center sm:col-span-2 lg:col-span-1">
                                <p className="text-sm text-white/70">Fósforo</p>
                                <p className="text-2xl font-semibold text-white">{latestSolo.fosforo ?? '--'} mg/kg</p>
                            </div>
                            <div className="p-4 bg-white/5 border border-white/10 rounded-lg text-center sm:col-span-2 lg:col-span-2">
                                <p className="text-sm text-white/70">Potássio</p>
                                <p className="text-2xl font-semibold text-white">{latestSolo.potassio ?? '--'} mg/kg</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-white/70">
                            <Leaf className="w-16 h-16 mx-auto mb-4 text-white/50" />
                            <p className="text-lg mb-2 text-white">Nenhuma medição no momento</p>
                            <p className="text-sm text-white/80">Assim que os dispositivos enviarem novas leituras do solo, elas aparecerão aqui.</p>
                        </div>
                    )}
                </div>

                <div className="bg-[#1A5653] border border-white/10 rounded-xl p-6 shadow-lg shadow-black/20">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-white">Histórico recente</h3>
                        <span className="text-sm text-white/80">{parametrosSolo.length} registros exibidos</span>
                    </div>

                    {parametrosSolo.length === 0 ? (
                        <div className="text-center py-12 text-white/70">
                            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                                <span className="text-2xl">📊</span>
                            </div>
                            <p className="text-lg mb-2 text-white">Nenhum histórico disponível</p>
                            <p className="text-sm text-white/80">O histórico será preenchido conforme os sensores enviarem novas medições.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto border border-white/10 rounded-xl">
                            <table className="min-w-full text-sm text-left text-white">
                                <thead className="bg-white/10 text-white uppercase tracking-wide text-xs">
                                    <tr>
                                        <th className="px-3 py-2">Dispositivo</th>
                                        <th className="px-3 py-2">Data/Hora</th>
                                        <th className="px-3 py-2">pH</th>
                                        <th className="px-3 py-2">Cond. Elétrica</th>
                                        <th className="px-3 py-2">Temp (°C)</th>
                                        <th className="px-3 py-2">Umidade (%)</th>
                                        <th className="px-3 py-2">N</th>
                                        <th className="px-3 py-2">P</th>
                                        <th className="px-3 py-2">K</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parametrosSolo.map((registro) => (
                                        <tr key={registro.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                            <td className="px-3 py-2 font-mono text-xs text-white/80">{registro.id_dispositivo}</td>
                                            <td className="px-3 py-2 text-white/80">{new Date(registro.data_hora).toLocaleString('pt-BR')}</td>
                                            <td className="px-3 py-2 text-white">{registro.ph ?? '--'}</td>
                                            <td className="px-3 py-2 text-white">{registro.condutividade_eletrica ?? '--'}</td>
                                            <td className="px-3 py-2 text-white">{registro.temperatura_solo ?? '--'}</td>
                                            <td className="px-3 py-2 text-white">{registro.umidade_solo ?? '--'}</td>
                                            <td className="px-3 py-2 text-white">{registro.nitrogenio ?? '--'}</td>
                                            <td className="px-3 py-2 text-white">{registro.fosforo ?? '--'}</td>
                                            <td className="px-3 py-2 text-white">{registro.potassio ?? '--'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
