-- SETUP COMPLETO: Execute este script no SQL Editor do Supabase
-- Este script corrige as políticas RLS e insere dados de teste

-- 1. CORRIGIR POLÍTICAS RLS
-- Remover políticas existentes
DROP POLICY IF EXISTS "Permitir leitura de dispositivos" ON dispositivos;
DROP POLICY IF EXISTS "Permitir inserção de dispositivos" ON dispositivos;
DROP POLICY IF EXISTS "Permitir inserção parametros solo" ON parametros_solo;
DROP POLICY IF EXISTS "Permitir leitura parametros solo" ON parametros_solo;
DROP POLICY IF EXISTS "Permitir inserção parametros climaticos" ON parametros_climaticos;
DROP POLICY IF EXISTS "Permitir leitura parametros climaticos" ON parametros_climaticos;
DROP POLICY IF EXISTS "Permitir inserção de contatos" ON contacts;
DROP POLICY IF EXISTS "Permitir leitura de contatos" ON contacts;

-- Criar políticas corretas
CREATE POLICY "Permitir leitura de dispositivos" ON dispositivos FOR SELECT USING (true);
CREATE POLICY "Permitir inserção parametros solo" ON parametros_solo FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura parametros solo" ON parametros_solo FOR SELECT USING (true);
CREATE POLICY "Permitir inserção parametros climaticos" ON parametros_climaticos FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura parametros climaticos" ON parametros_climaticos FOR SELECT USING (true);
CREATE POLICY "Permitir inserção de contatos" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir leitura de contatos" ON contacts FOR SELECT USING (true);

-- 2. INSERIR DADOS DE TESTE
-- Inserir dispositivo
INSERT INTO dispositivos (id_dispositivo, nome, localizacao, latitude, longitude) 
VALUES ('DF001', 'Estação Principal', 'Fazenda Experimental', -23.5505, -46.6333)
ON CONFLICT (id_dispositivo) DO NOTHING;

-- Inserir dados de solo recentes
INSERT INTO parametros_solo (id_dispositivo, data_hora, ph, condutividade_eletrica, temperatura_solo, umidade_solo, nitrogenio, fosforo, potassio) VALUES
('DF001', NOW(), 6.8, 1.2, 25.5, 68.2, 45.8, 12.3, 156.7),
('DF001', NOW() - INTERVAL '1 hour', 6.7, 1.1, 24.8, 65.1, 44.2, 11.9, 152.3),
('DF001', NOW() - INTERVAL '2 hours', 6.9, 1.3, 26.1, 69.8, 47.1, 13.2, 158.9),
('DF001', NOW() - INTERVAL '3 hours', 6.6, 1.0, 23.9, 62.4, 43.5, 11.2, 149.8),
('DF001', NOW() - INTERVAL '4 hours', 6.8, 1.2, 25.3, 66.7, 46.2, 12.1, 154.6);

-- Inserir dados climáticos recentes
INSERT INTO parametros_climaticos (id_dispositivo, data_hora, chuva, temperatura_ar, umidade_ar, radiacao_solar) VALUES
('DF001', NOW(), 0.0, 28.3, 72.1, 845.6),
('DF001', NOW() - INTERVAL '1 hour', 0.5, 27.8, 74.2, 823.4),
('DF001', NOW() - INTERVAL '2 hours', 1.2, 29.1, 68.9, 867.2),
('DF001', NOW() - INTERVAL '3 hours', 0.8, 26.9, 76.3, 789.1),
('DF001', NOW() - INTERVAL '4 hours', 0.0, 28.7, 71.5, 856.3);

-- 3. VERIFICAR RESULTADO
SELECT 
    'Setup concluído!' as status,
    (SELECT COUNT(*) FROM dispositivos) as dispositivos,
    (SELECT COUNT(*) FROM parametros_solo) as dados_solo,
    (SELECT COUNT(*) FROM parametros_climaticos) as dados_clima;
