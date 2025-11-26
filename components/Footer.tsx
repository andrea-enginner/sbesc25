'use client'

export default function Footer() {
  return (
    <footer className="bg-[#1A5653] text-white py-10 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white">Démeter - Equipe SBESC 2025</h3>
          <p className="text-sm text-white max-w-lg">
            Painel em tempo real para monitoramento agronômico. Dados fornecidos por sensores IoT e armazenados no Firebase Realtime Database.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm text-white">
          <div>
            <p className="text-xs uppercase tracking-wide text-white">Documentação</p>
            <ul className="mt-2 space-y-1 text-white">
              <li>
                <a href="https://nextjs.org/docs" target="_blank" rel="noreferrer" className="hover:text-white">
                  Next.js Docs
                </a>
              </li>
              <li>
                <a href="https://firebase.google.com/docs/database" target="_blank" rel="noreferrer" className="hover:text-white">
                  Firebase Docs
                </a>
              </li>
              <li>
                <a href="https://tailwindcss.com/docs" target="_blank" rel="noreferrer" className="hover:text-white">
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-white">Versão</p>
            <ul className="mt-2 space-y-1 text-white">
              <li>Painel v0.3.0-preview</li>
              <li>Atualizado em {new Date().toLocaleDateString('pt-BR')}</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
