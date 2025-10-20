-- Script para corrigir as políticas RLS no Supabase
-- Execute este script no SQL Editor do Supabase para permitir o acesso aos dados

-- Remover políticas existentes (se houver)
DROP POLICY IF EXISTS "Permitir leitura de dispositivos" ON dispositivos;
DROP POLICY IF EXISTS "Permitir inserção de dispositivos" ON dispositivos;
DROP POLICY IF EXISTS "Permitir inserção parametros solo" ON parametros_solo;
DROP POLICY IF EXISTS "Permitir leitura parametros solo" ON parametros_solo;
DROP POLICY IF EXISTS "Permitir inserção parametros climaticos" ON parametros_climaticos;
DROP POLICY IF EXISTS "Permitir leitura parametros climaticos" ON parametros_climaticos;
DROP POLICY IF EXISTS "Permitir inserção de contatos" ON contacts;
DROP POLICY IF EXISTS "Permitir leitura de contatos" ON contacts;

-- Criar políticas corretas para permitir acesso público (para esta versão de visualização)

-- Dispositivos: permitir leitura pública
CREATE POLICY "Permitir leitura de dispositivos" ON dispositivos
  FOR SELECT USING (true);

-- Parâmetros do solo: permitir inserção e leitura públicas
CREATE POLICY "Permitir inserção parametros solo" ON parametros_solo
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir leitura parametros solo" ON parametros_solo
  FOR SELECT USING (true);

-- Parâmetros climáticos: permitir inserção e leitura públicas
CREATE POLICY "Permitir inserção parametros climaticos" ON parametros_climaticos
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir leitura parametros climaticos" ON parametros_climaticos
  FOR SELECT USING (true);

-- Contatos: permitir inserção pública e leitura (para administração)
CREATE POLICY "Permitir inserção de contatos" ON contacts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir leitura de contatos" ON contacts
  FOR SELECT USING (true);

-- Verificar se as políticas foram criadas
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('dispositivos', 'parametros_solo', 'parametros_climaticos', 'contacts')
ORDER BY tablename, policyname;
