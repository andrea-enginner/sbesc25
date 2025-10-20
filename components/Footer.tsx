'use client'

import { Mail, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4">Equipe [deméter] - SBESC 2025</h3>
                        <p className="text-gray-400 mb-6 max-w-md">
                            Transformando ideias em realidade através de tecnologia inovadora
                            e soluções conectadas com Supabase.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Github className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin className="w-6 h-6" />
                            </a>
                            <a href="mailto:contato@exemplo.com" className="text-gray-400 hover:text-white transition-colors">
                                <Mail className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
                        <ul className="space-y-2">
                            <li><a href="#inicio" className="text-gray-400 hover:text-white transition-colors">Início</a></li>
                            <li><a href="#recursos" className="text-gray-400 hover:text-white transition-colors">Recursos</a></li>
                            <li><a href="#contato" className="text-gray-400 hover:text-white transition-colors">Contato</a></li>
                            <li><a href="#sobre" className="text-gray-400 hover:text-white transition-colors">Sobre</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Tecnologias</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Next.js</li>
                            <li>TypeScript</li>
                            <li>Supabase</li>
                            <li>Tailwind CSS</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        © 2025 SBESC. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )
}
