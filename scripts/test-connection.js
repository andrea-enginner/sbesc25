// Script para testar a conexão com o Supabase
const { createClient } = require('@supabase/supabase-js')

// Carregar variáveis de ambiente
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vbniaajmssoibcvadwzf.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'SUA_CHAVE_AQUI'

if (!supabaseAnonKey || supabaseAnonKey === 'SUA_CHAVE_AQUI') {
  console.error('❌ Configure o arquivo .env.local com suas credenciais do Supabase')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  console.log('🔍 Testando conexão com Supabase...')
  console.log('URL:', supabaseUrl)
  console.log('Key:', supabaseAnonKey.substring(0, 20) + '...')
  
  try {
    // Teste básico de conexão
    const { data: dispositivos, error: errorDispositivos } = await supabase
      .from('dispositivos')
      .select('*')
      .limit(5)

    const { data: solo, error: errorSolo } = await supabase
      .from('parametros_solo')
      .select('*')
      .limit(5)

    const { data: clima, error: errorClima } = await supabase
      .from('parametros_climaticos')
      .select('*')
      .limit(5)

    console.log('\n📊 Resultados:')
    console.log('Dispositivos:', errorDispositivos ? `❌ ${errorDispositivos.message}` : `✅ ${dispositivos?.length || 0} registros`)
    console.log('Dados Solo:', errorSolo ? `❌ ${errorSolo.message}` : `✅ ${solo?.length || 0} registros`)
    console.log('Dados Clima:', errorClima ? `❌ ${errorClima.message}` : `✅ ${clima?.length || 0} registros`)

    if (errorDispositivos || errorSolo || errorClima) {
      console.log('\n🚨 PROBLEMA: Políticas RLS não configuradas!')
      console.log('Execute o script fix-rls-policies.sql no Supabase')
    } else {
      console.log('\n✅ Conexão com Supabase funcionando!')
    }
  } catch (err) {
    console.log('❌ Erro ao testar conexão:', err.message)
  }
}

testConnection()
