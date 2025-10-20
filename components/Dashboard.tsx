'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Droplets, Thermometer, Sun, Cloud, Leaf, Zap, RefreshCw } from 'lucide-react'

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

interface ParametrosClimaticos {
    id: string
    id_dispositivo: string
    data_hora: string
    chuva: number
    temperatura_ar: number
    umidade_ar: number
    radiacao_solar: number
}

export default function Dashboard() {
    const [parametrosSolo, setParametrosSolo] = useState<ParametrosSolo[]>([])
    const [parametrosClimaticos, setParametrosClimaticos] = useState<ParametrosClimaticos[]>([])
    const [loading, setLoading] = useState(true)
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

    useEffect(() => {
        // Debug: verificar variáveis de ambiente
        console.log('🔍 Debug Deploy - Variáveis:')
        console.log('URL configurada:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Sim' : '❌ Não')
        console.log('Key configurada:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Sim' : '❌ Não')
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
            console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
        }
        
        fetchData()
        // Atualizar dados a cada 30 segundos para simular tempo real
        const interval = setInterval(fetchData, 30000)
        return () => clearInterval(interval)
    }, [])

    const fetchData = async () => {
        try {
            console.log('🔄 Buscando dados do Supabase...')
            
            // Verificar se o cliente Supabase está configurado
            if (!supabase) {
                console.error('❌ Cliente Supabase não configurado')
                return
            }

            // Buscar últimos parâmetros do solo
            const { data: solos, error: errorSolo } = await supabase
                .from('parametros_solo')
                .select('*')
                .order('data_hora', { ascending: false })
                .limit(20)

            // Buscar últimos parâmetros climáticos
            const { data: climaticos, error: errorClima } = await supabase
                .from('parametros_climaticos')
                .select('*')
                .order('data_hora', { ascending: false })
                .limit(20)

            console.log('📊 Resultados da busca:')
            if (errorSolo) {
                console.error('❌ Erro ao buscar dados do solo:', errorSolo.message)
                console.error('Detalhes:', errorSolo)
            } else {
                console.log('✅ Dados do solo:', solos?.length || 0, 'registros')
                if (solos?.length > 0) {
                    console.log('Primeiro registro solo:', solos[0])
                }
            }

            if (errorClima) {
                console.error('❌ Erro ao buscar dados climáticos:', errorClima.message)
                console.error('Detalhes:', errorClima)
            } else {
                console.log('✅ Dados climáticos:', climaticos?.length || 0, 'registros')
                if (climaticos?.length > 0) {
                    console.log('Primeiro registro clima:', climaticos[0])
                }
            }

            setParametrosSolo(solos || [])
            setParametrosClimaticos(climaticos || [])
            setLastUpdate(new Date())
        } catch (error) {
            console.error('❌ Erro geral ao buscar dados:', error)
        } finally {
            setLoading(false)
        }
    }

    const latestSolo = parametrosSolo[0]
    const latestClima = parametrosClimaticos[0]

    if (loading) {
        return (
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Carregando dados de monitoramento...</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Sistema de Monitoramento Agrícola
                    </h2>
                    <p className="text-xl text-gray-600 mb-4">
                        Visualização dos dados coletados pelos sensores IoT
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        {lastUpdate && (
                            <p className="text-sm text-gray-500">
                                Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
                            </p>
                        )}
                        <button
                            onClick={fetchData}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            Atualizar
                        </button>
                    </div>
                </div>

                {/* Cards de dados mais recentes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Parâmetros do Solo */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-green-100 p-3 rounded-lg">
                                <Leaf className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">Parâmetros do Solo</h3>
                                <p className="text-gray-600 text-sm">
                                    {latestSolo ? `Última atualização: ${new Date(latestSolo.data_hora).toLocaleString('pt-BR')}` : 'Nenhum dado disponível'}
                                </p>
                            </div>
                        </div>

                        {latestSolo ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600">pH</p>
                                    <p className="text-2xl font-bold text-gray-900">{latestSolo.ph || '--'}</p>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600">Cond. Elétrica (mS/cm)</p>
                                    <p className="text-2xl font-bold text-gray-900">{latestSolo.condutividade_eletrica || '--'}</p>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-center gap-1">
                                        <Thermometer className="w-4 h-4 text-blue-600" />
                                        <p className="text-sm text-gray-600">Temp. Solo (°C)</p>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{latestSolo.temperatura_solo || '--'}</p>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center justify-center gap-1">
                                        <Droplets className="w-4 h-4 text-blue-600" />
                                        <p className="text-sm text-gray-600">Umidade (%)</p>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{latestSolo.umidade_solo || '--'}</p>
                                </div>
                                {/* NPK */}
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <p className="text-sm text-gray-600">Nitrogênio (mg/kg)</p>
                                    <p className="text-xl font-bold text-green-700">{latestSolo.nitrogenio || '--'}</p>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <p className="text-sm text-gray-600">Fósforo (mg/kg)</p>
                                    <p className="text-xl font-bold text-green-700">{latestSolo.fosforo || '--'}</p>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-lg col-span-2">
                                    <p className="text-sm text-gray-600">Potássio (mg/kg)</p>
                                    <p className="text-xl font-bold text-green-700">{latestSolo.potassio || '--'}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <Leaf className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p className="text-lg mb-2">Aguardando dados dos sensores</p>
                                <p className="text-sm">Os dados de pH, condutividade, temperatura, umidade e NPK serão exibidos aqui quando os dispositivos IoT enviarem as medições.</p>
                            </div>
                        )}
                    </div>

                    {/* Parâmetros Climáticos */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Sun className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">Parâmetros Climáticos</h3>
                                <p className="text-gray-600 text-sm">
                                    {latestClima ? `Última atualização: ${new Date(latestClima.data_hora).toLocaleString('pt-BR')}` : 'Nenhum dado disponível'}
                                </p>
                            </div>
                        </div>

                        {latestClima ? (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <div className="flex items-center justify-center gap-1">
                                        <Cloud className="w-4 h-4 text-blue-600" />
                                        <p className="text-sm text-gray-600">Chuva (mm)</p>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-700">{latestClima.chuva || '--'}</p>
                                </div>
                                <div className="text-center p-4 bg-red-50 rounded-lg">
                                    <div className="flex items-center justify-center gap-1">
                                        <Thermometer className="w-4 h-4 text-red-600" />
                                        <p className="text-sm text-gray-600">Temp. Ar (°C)</p>
                                    </div>
                                    <p className="text-2xl font-bold text-red-700">{latestClima.temperatura_ar || '--'}</p>
                                </div>
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <div className="flex items-center justify-center gap-1">
                                        <Droplets className="w-4 h-4 text-blue-600" />
                                        <p className="text-sm text-gray-600">Umidade (%)</p>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-700">{latestClima.umidade_ar || '--'}</p>
                                </div>
                                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                                    <div className="flex items-center justify-center gap-1">
                                        <Zap className="w-4 h-4 text-yellow-600" />
                                        <p className="text-sm text-gray-600">Radiação (W/m²)</p>
                                    </div>
                                    <p className="text-2xl font-bold text-yellow-700">{latestClima.radiacao_solar || '--'}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <Sun className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p className="text-lg mb-2">Aguardando dados climáticos</p>
                                <p className="text-sm">Os dados de chuva, temperatura do ar, umidade e radiação solar serão exibidos aqui quando os sensores enviarem as medições.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Histórico de dados */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">Histórico de Medições</h3>
                        <div className="text-sm text-gray-500">
                            {parametrosSolo.length + parametrosClimaticos.length} registros encontrados
                        </div>
                    </div>

                    {parametrosSolo.length === 0 && parametrosClimaticos.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl">📊</span>
                            </div>
                            <p className="text-lg mb-2">Nenhum dado histórico disponível</p>
                            <p className="text-sm">O histórico de medições será exibido aqui conforme os sensores enviarem dados para o banco.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Tabela Solo */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-lg font-medium text-gray-800">Parâmetros do Solo</h4>
                                    <span className="text-sm text-gray-500">{parametrosSolo.length} registros</span>
                                </div>
                                {parametrosSolo.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-sm">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-3 py-2 text-left">Dispositivo</th>
                                                    <th className="px-3 py-2 text-left">Data/Hora</th>
                                                    <th className="px-3 py-2 text-left">pH</th>
                                                    <th className="px-3 py-2 text-left">Temp (°C)</th>
                                                    <th className="px-3 py-2 text-left">Umidade (%)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {parametrosSolo.slice(0, 5).map((solo) => (
                                                    <tr key={solo.id} className="border-b hover:bg-gray-50">
                                                        <td className="px-3 py-2 font-mono text-xs">{solo.id_dispositivo}</td>
                                                        <td className="px-3 py-2">{new Date(solo.data_hora).toLocaleString('pt-BR')}</td>
                                                        <td className="px-3 py-2">{solo.ph || '--'}</td>
                                                        <td className="px-3 py-2">{solo.temperatura_solo || '--'}</td>
                                                        <td className="px-3 py-2">{solo.umidade_solo || '--'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-400">
                                        <p>Nenhum dado de solo encontrado</p>
                                    </div>
                                )}
                            </div>

                            {/* Tabela Clima */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-lg font-medium text-gray-800">Parâmetros Climáticos</h4>
                                    <span className="text-sm text-gray-500">{parametrosClimaticos.length} registros</span>
                                </div>
                                {parametrosClimaticos.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-sm">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-3 py-2 text-left">Dispositivo</th>
                                                    <th className="px-3 py-2 text-left">Data/Hora</th>
                                                    <th className="px-3 py-2 text-left">Chuva (mm)</th>
                                                    <th className="px-3 py-2 text-left">Temp (°C)</th>
                                                    <th className="px-3 py-2 text-left">Umidade (%)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {parametrosClimaticos.slice(0, 5).map((clima) => (
                                                    <tr key={clima.id} className="border-b hover:bg-gray-50">
                                                        <td className="px-3 py-2 font-mono text-xs">{clima.id_dispositivo}</td>
                                                        <td className="px-3 py-2">{new Date(clima.data_hora).toLocaleString('pt-BR')}</td>
                                                        <td className="px-3 py-2">{clima.chuva || '--'}</td>
                                                        <td className="px-3 py-2">{clima.temperatura_ar || '--'}</td>
                                                        <td className="px-3 py-2">{clima.umidade_ar || '--'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-400">
                                        <p>Nenhum dado climático encontrado</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
