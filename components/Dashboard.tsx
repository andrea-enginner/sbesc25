'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { RefreshCw, Leaf, Droplets, Thermometer, Wind, Flame } from 'lucide-react'

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

function describePh(ph: number) {
    if (ph < 5.5) return 'Solo muito ácido'
    if (ph < 6.5) return 'Faixa levemente ácida'
    if (ph <= 7.5) return 'Equilíbrio adequado'
    return 'Solo alcalino'
}

export default function Dashboard() {
    const [parametrosSolo, setParametrosSolo] = useState<ParametroSolo[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

    const loadSoilData = useCallback(async () => {
        try {
            const response = await fetch('/api/parametro-solo', {
                cache: 'no-store',
            })

            if (!response.ok) {
                throw new Error('Falha ao buscar dados no backend')
            }

            const data: ParametroSolo[] = await response.json()
            setParametrosSolo(data)
            setLastUpdate(new Date())
            setError(null)
        } catch (err) {
            console.error('❌ Erro ao buscar dados do solo:', err)
            setError('Não foi possível carregar os dados do Firebase.')
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

    const averagePh = useMemo(() => {
        if (!parametrosSolo.length) return null
        const sum = parametrosSolo.reduce((total, registro) => total + registro.ph, 0)
        return Number((sum / parametrosSolo.length).toFixed(2))
    }, [parametrosSolo])

    const minPh = useMemo(() => {
        if (!parametrosSolo.length) return null
        return Math.min(...parametrosSolo.map((registro) => registro.ph))
    }, [parametrosSolo])

    const maxPh = useMemo(() => {
        if (!parametrosSolo.length) return null
        return Math.max(...parametrosSolo.map((registro) => registro.ph))
    }, [parametrosSolo])

    if (loading) {
        return (
            <section className="py-20 px-4 bg-[#107869] text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-4">
                        <div className="mx-auto h-12 w-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-sm uppercase tracking-wide">Carregando dados do Firebase...</p>
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
                            Leitura contínua de parâmetros do solo (pH, NPK, temperatura, umidade) capturada pelos sensores e armazenada diretamente no Firebase Realtime Database.
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

                {error && (
                    <div className="bg-red-500/20 border border-red-400/40 text-white rounded-xl px-4 py-3 text-sm">
                        {error}
                    </div>
                )}

                <div className="bg-[#1A5653] border border-white/10 rounded-xl p-6 shadow-lg shadow-black/20 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/10 p-3 rounded-lg">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white">Última medição registrada</h3>
                            <p className="text-sm text-white/80">
                                {latestSolo ? `Registro #${latestSolo.id}` : 'Nenhum dado disponível'}
                            </p>
                        </div>
                    </div>

                    {latestSolo ? (
                        <div className="space-y-4">
                            {/* Parâmetros principais */}
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                <div className="p-5 bg-white/5 border border-white/10 rounded-lg text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Leaf className="w-4 h-4 text-white/70" />
                                        <p className="text-sm text-white/70">pH</p>
                                    </div>
                                    <p className="text-3xl font-semibold text-white">{latestSolo.ph?.toFixed(2) ?? '--'}</p>
                                    <p className="text-xs uppercase tracking-wide text-white/60 mt-1">{latestSolo.ph ? describePh(latestSolo.ph) : ''}</p>
                                </div>
                                
                                {latestSolo.nitrogenio !== undefined && (
                                    <div className="p-5 bg-white/5 border border-white/10 rounded-lg text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Flame className="w-4 h-4 text-white/70" />
                                            <p className="text-sm text-white/70">Nitrogênio</p>
                                        </div>
                                        <p className="text-3xl font-semibold text-white">{latestSolo.nitrogenio.toFixed(1)}</p>
                                        <p className="text-xs text-white/60 mt-1">mg/kg</p>
                                    </div>
                                )}
                                
                                {latestSolo.fosforo !== undefined && (
                                    <div className="p-5 bg-white/5 border border-white/10 rounded-lg text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Flame className="w-4 h-4 text-white/70" />
                                            <p className="text-sm text-white/70">Fósforo</p>
                                        </div>
                                        <p className="text-3xl font-semibold text-white">{latestSolo.fosforo.toFixed(2)}</p>
                                        <p className="text-xs text-white/60 mt-1">mg/kg</p>
                                    </div>
                                )}
                                
                                {latestSolo.potassio !== undefined && (
                                    <div className="p-5 bg-white/5 border border-white/10 rounded-lg text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Flame className="w-4 h-4 text-white/70" />
                                            <p className="text-sm text-white/70">Potássio</p>
                                        </div>
                                        <p className="text-3xl font-semibold text-white">{latestSolo.potassio.toFixed(2)}</p>
                                        <p className="text-xs text-white/60 mt-1">mg/kg</p>
                                    </div>
                                )}
                                
                                {latestSolo.temperatura !== undefined && (
                                    <div className="p-5 bg-white/5 border border-white/10 rounded-lg text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Thermometer className="w-4 h-4 text-white/70" />
                                            <p className="text-sm text-white/70">Temperatura</p>
                                        </div>
                                        <p className="text-3xl font-semibold text-white">{latestSolo.temperatura.toFixed(1)}</p>
                                        <p className="text-xs text-white/60 mt-1">°C</p>
                                    </div>
                                )}
                                
                                {latestSolo.umidade !== undefined && (
                                    <div className="p-5 bg-white/5 border border-white/10 rounded-lg text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Droplets className="w-4 h-4 text-white/70" />
                                            <p className="text-sm text-white/70">Umidade</p>
                                        </div>
                                        <p className="text-3xl font-semibold text-white">{latestSolo.umidade.toFixed(1)}</p>
                                        <p className="text-xs text-white/60 mt-1">%</p>
                                    </div>
                                )}
                                
                                {latestSolo.dataHora && (
                                    <div className="p-5 bg-white/5 border border-white/10 rounded-lg text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2">
                                            <Wind className="w-4 h-4 text-white/70" />
                                            <p className="text-sm text-white/70">Data/Hora</p>
                                        </div>
                                        <p className="text-xs font-semibold text-white">{latestSolo.dataHora}</p>
                                    </div>
                                )}
                            </div>
                            
                            {/* Estatísticas do pH */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-5 bg-white/5 border border-white/10 rounded-lg text-center">
                                    <p className="text-sm text-white/70">Média das últimas leituras (pH)</p>
                                    <p className="text-3xl font-semibold text-white">{averagePh ?? '--'}</p>
                                </div>
                                <div className="p-5 bg-white/5 border border-white/10 rounded-lg text-center">
                                    <p className="text-sm text-white/70">Menor pH</p>
                                    <p className="text-3xl font-semibold text-white">{minPh ?? '--'}</p>
                                </div>
                                <div className="p-5 bg-white/5 border border-white/10 rounded-lg text-center">
                                    <p className="text-sm text-white/70">Maior pH</p>
                                    <p className="text-3xl font-semibold text-white">{maxPh ?? '--'}</p>
                                </div>
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
                                        <th className="px-3 py-2">ID</th>
                                        <th className="px-3 py-2">pH</th>
                                        <th className="px-3 py-2">Nitrogênio</th>
                                        <th className="px-3 py-2">Fósforo</th>
                                        <th className="px-3 py-2">Potássio</th>
                                        <th className="px-3 py-2">Temperatura</th>
                                        <th className="px-3 py-2">Umidade</th>
                                        <th className="px-3 py-2">Data/Hora</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parametrosSolo.map((registro) => (
                                        <tr key={registro.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                            <td className="px-3 py-2 font-mono text-xs text-white/80">#{registro.id.slice(-8)}</td>
                                            <td className="px-3 py-2 text-white">{registro.ph?.toFixed(2) ?? '--'}</td>
                                            <td className="px-3 py-2 text-white">{registro.nitrogenio !== undefined ? registro.nitrogenio.toFixed(1) : '--'}</td>
                                            <td className="px-3 py-2 text-white">{registro.fosforo !== undefined ? registro.fosforo.toFixed(2) : '--'}</td>
                                            <td className="px-3 py-2 text-white">{registro.potassio !== undefined ? registro.potassio.toFixed(2) : '--'}</td>
                                            <td className="px-3 py-2 text-white">{registro.temperatura !== undefined ? `${registro.temperatura.toFixed(1)}°C` : '--'}</td>
                                            <td className="px-3 py-2 text-white">{registro.umidade !== undefined ? `${registro.umidade.toFixed(1)}%` : '--'}</td>
                                            <td className="px-3 py-2 text-white/80 text-xs">{registro.dataHora ?? '--'}</td>
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
