'use client'

import { ArrowRight, Star } from 'lucide-react'

export default function Hero() {
    return (
        <section className="relative bg-gradient-to-br from-primary-50 to-white py-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
                <div className="mb-8">
                    <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <Star className="w-4 h-4" />
                        Novo projeto SBESC 2025
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Monitoramento{' '}
                        <span className="text-primary-600">Agrícola</span> em{' '}
                        <span className="text-primary-600">Tempo Real</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Dashboard para visualização de dados coletados pelos sensores IoT,
                        monitorando parâmetros do solo e climáticos em tempo real através do Supabase.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button className="btn-primary flex items-center gap-2">
                        Começar Agora
                        <ArrowRight className="w-5 h-5" />
                    </button>
                    <button className="btn-secondary">
                        Saiba Mais
                    </button>
                </div>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-primary-600">8</span>
                        </div>
                        <h3 className="font-semibold text-gray-900">Parâmetros</h3>
                        <p className="text-gray-600">Monitorados em tempo real</p>
                    </div>
                    <div className="p-6">
                        <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-primary-600">IoT</span>
                        </div>
                        <h3 className="font-semibold text-gray-900">Dispositivos</h3>
                        <p className="text-gray-600">Conectados via API</p>
                    </div>
                    <div className="p-6">
                        <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-primary-600">24h</span>
                        </div>
                        <h3 className="font-semibold text-gray-900">Monitoramento</h3>
                        <p className="text-gray-600">Contínuo do ambiente</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
