import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Verificar se as variáveis estão definidas
if (!supabaseUrl) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL não está definida')
}

if (!supabaseAnonKey) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY não está definida')
}

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Variáveis de ambiente do Supabase não estão configuradas')
}

console.log('🔗 Configurando cliente Supabase...')
console.log('URL:', supabaseUrl)
console.log('Key (primeiros 20 chars):', supabaseAnonKey.substring(0, 20) + '...')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
