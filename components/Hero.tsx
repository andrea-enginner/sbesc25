'use client'

import { Activity, Clock, Satellite } from 'lucide-react'
import { useMemo } from 'react'

export default function Hero() {
    const lastSync = useMemo(() => new Date(), [])
    const lastSyncLabel = useMemo(
        () =>
            new Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
            }).format(lastSync),
        [lastSync]
    )

    return (
        <section className="bg-[#107869] text-white py-16 px-4 border-b border-white/10">
            <div className="max-w-5xl mx-auto space-y-8 text-center">
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white bg-white/10 border border-white/20 px-4 py-1 rounded-full">
                    <Activity className="w-3.5 h-3.5" /> Plataforma Agrícola Inteligente
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                        Deméter
                    </h1>
                    <p className="text-white max-w-2xl mx-auto leading-relaxed">
                        Painel unificado para visualizar o comportamento do solo. Informações claras para auxiliar decisões de campo em tempo real.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-white max-w-3xl mx-auto justify-items-center">
                    <div className="w-full bg-[#1A5653] border border-white/10 rounded-xl px-5 py-4">
                        <p className="text-xs uppercase tracking-wide text-white">Última sincronização</p>
                        <div className="mt-2 flex items-center justify-center gap-2 text-white font-medium">
                            <Clock className="w-4 h-4" />
                            {lastSyncLabel}
                        </div>
                    </div>
                    <div className="w-full bg-[#1A5653] border border-white/10 rounded-xl px-5 py-4">
                        <p className="text-xs uppercase tracking-wide text-white">Fonte de dados</p>
                        <div className="mt-2 flex items-center justify-center gap-2 text-white font-medium">
                            <Satellite className="w-4 h-4" />
                            Supabase + Sensores IoT
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
