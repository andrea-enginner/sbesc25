-- SCRIPT DE VERIFICAÇÃO PARA DEPLOY VERCEL
-- Execute este script no SQL Editor do Supabase para garantir que tudo está funcionando

-- 1. VERIFICAR SE AS POLÍTICAS RLS ESTÃO ATIVAS
SELECT 
    schemaname, 
    tablename, 
    rowsecurity as rls_ativado
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('parametros_solo', 'dispositivos');

-- 2. VERIFICAR POLÍTICAS EXISTENTES
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('parametros_solo', 'dispositivos')
ORDER BY tablename, policyname;

-- 3. CONTAR DADOS EXISTENTES
SELECT 
    'Dispositivos' as tabela,
    COUNT(*) as total
FROM dispositivos
UNION ALL
SELECT 
    'Parametros Solo' as tabela,
    COUNT(*) as total
FROM parametros_solo;

-- 4. TESTAR QUERY COM USUÁRIO ANÔNIMO (simula o que o front-end faz)
SET ROLE anon;

SELECT 'Teste de acesso aos dados' as status;

-- Tentar acessar dispositivos
SELECT COUNT(*) as dispositivos_count FROM dispositivos;

-- Tentar acessar dados do solo
SELECT COUNT(*) as solo_count FROM parametros_solo;

-- Voltar ao role padrão
RESET ROLE;

-- 5. CORRIGIR POLÍTICAS SE NECESSÁRIO (execute apenas se o teste acima falhar)
/*
DROP POLICY IF EXISTS "Permitir leitura parametros solo" ON parametros_solo;
DROP POLICY IF EXISTS "Permitir inserção parametros solo" ON parametros_solo;
DROP POLICY IF EXISTS "Permitir leitura de dispositivos" ON dispositivos;

CREATE POLICY "Permitir leitura parametros solo" ON parametros_solo FOR SELECT USING (true);
CREATE POLICY "Permitir inserção parametros solo" ON parametros_solo FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura de dispositivos" ON dispositivos FOR SELECT USING (true);
*/
