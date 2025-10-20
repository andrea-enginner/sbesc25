'use client'

import { Database, Zap, Shield, Smartphone } from 'lucide-react'

const features = [
    {
        icon: Database,
        title: 'Dados em Tempo Real',
        description: 'Monitoramento contínuo de pH, condutividade elétrica, temperatura e umidade do solo através do Supabase.',
    },
    {
        icon: Zap,
        title: 'Análise Climática',
        description: 'Acompanhamento de chuva, temperatura do ar, umidade e radiação solar para tomada de decisões precisas.',
    },
    {
        icon: Shield,
        title: 'Dispositivos IoT Seguros',
        description: 'Identificação única de cada dispositivo final (DF) com segurança RLS para proteção dos dados agrícolas.',
    },
    {
        icon: Smartphone,
        title: 'Interface Intuitiva',
        description: 'Dashboard responsivo para visualização dos parâmetros NPK e histórico de medições em qualquer dispositivo.',
    },
]

export default function Features() {
    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Por que escolher nossa solução?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Combinamos as melhores tecnologias para oferecer uma experiência
                        excepcional aos nossos usuários.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <div className="bg-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                <feature.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
