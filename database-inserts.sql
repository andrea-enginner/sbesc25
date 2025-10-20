-- Script de inserção de dados de exemplo para o Sistema de Monitoramento Agrícola SBESC 2025
-- Execute este script no SQL Editor do Supabase após executar o supabase-setup.sql

-- Primeiro, vamos inserir alguns dispositivos finais (DF)
INSERT INTO dispositivos (id_dispositivo, nome, localizacao, latitude, longitude) VALUES
('DF001', 'Estação Principal', 'Fazenda Experimental - Setor A', -23.5505, -46.6333),
('DF002', 'Sensor Secundário', 'Fazenda Experimental - Setor B', -23.5520, -46.6350),
('DF003', 'Monitor Técnico', 'Fazenda Experimental - Setor C', -23.5480, -46.6320)
ON CONFLICT (id_dispositivo) DO NOTHING;

-- Inserir dados de parâmetros do solo (últimas 24 horas)
INSERT INTO parametros_solo (id_dispositivo, data_hora, ph, condutividade_eletrica, temperatura_solo, umidade_solo, nitrogenio, fosforo, potassio) VALUES
-- DF001 - Dados mais recentes
('DF001', NOW() - INTERVAL '10 minutes', 6.8, 1.2, 25.5, 68.2, 45.8, 12.3, 156.7),
('DF001', NOW() - INTERVAL '1 hour', 6.7, 1.1, 24.8, 65.1, 44.2, 11.9, 152.3),
('DF001', NOW() - INTERVAL '2 hours', 6.9, 1.3, 26.1, 69.8, 47.1, 13.2, 158.9),
('DF001', NOW() - INTERVAL '3 hours', 6.6, 1.0, 23.9, 62.4, 43.5, 11.2, 149.8),
('DF001', NOW() - INTERVAL '4 hours', 6.8, 1.2, 25.3, 66.7, 46.2, 12.1, 154.6),

-- DF001 - Dados do dia anterior
('DF001', NOW() - INTERVAL '6 hours', 7.0, 1.4, 27.2, 72.1, 48.9, 13.8, 162.4),
('DF001', NOW() - INTERVAL '8 hours', 6.5, 0.9, 23.1, 59.8, 42.1, 10.8, 147.2),
('DF001', NOW() - INTERVAL '12 hours', 6.8, 1.1, 24.6, 64.3, 45.6, 12.7, 153.9),
('DF001', NOW() - INTERVAL '18 hours', 6.7, 1.0, 25.0, 67.5, 44.8, 11.6, 151.4),
('DF001', NOW() - INTERVAL '24 hours', 6.9, 1.3, 26.8, 70.2, 47.3, 13.1, 159.7),

-- DF002 - Dados do segundo dispositivo
('DF002', NOW() - INTERVAL '15 minutes', 7.1, 1.5, 26.3, 71.8, 49.2, 14.1, 165.3),
('DF002', NOW() - INTERVAL '1 hour 15 minutes', 6.9, 1.3, 25.7, 69.4, 46.8, 12.9, 157.6),
('DF002', NOW() - INTERVAL '2 hours 15 minutes', 7.0, 1.4, 27.1, 73.2, 48.5, 13.7, 161.8),
('DF002', NOW() - INTERVAL '5 hours', 6.6, 1.1, 24.4, 65.9, 44.3, 11.8, 152.1),
('DF002', NOW() - INTERVAL '8 hours', 7.2, 1.6, 28.1, 74.8, 50.1, 14.5, 167.9),

-- DF003 - Dados do terceiro dispositivo  
('DF003', NOW() - INTERVAL '25 minutes', 6.4, 0.8, 22.7, 58.3, 41.2, 10.5, 143.8),
('DF003', NOW() - INTERVAL '1 hour 25 minutes', 6.3, 0.7, 22.1, 56.9, 40.8, 10.1, 141.5),
('DF003', NOW() - INTERVAL '3 hours', 6.5, 0.9, 23.5, 61.2, 42.7, 11.0, 146.7);

-- Inserir dados de parâmetros climáticos (últimas 24 horas)
INSERT INTO parametros_climaticos (id_dispositivo, data_hora, chuva, temperatura_ar, umidade_ar, radiacao_solar) VALUES
-- DF001 - Dados mais recentes
('DF001', NOW() - INTERVAL '10 minutes', 0.0, 28.3, 72.1, 845.6),
('DF001', NOW() - INTERVAL '1 hour', 0.5, 27.8, 74.2, 823.4),
('DF001', NOW() - INTERVAL '2 hours', 1.2, 29.1, 68.9, 867.2),
('DF001', NOW() - INTERVAL '3 hours', 0.8, 26.9, 76.3, 789.1),
('DF001', NOW() - INTERVAL '4 hours', 0.0, 28.7, 71.5, 856.3),

-- DF001 - Dados do período anterior
('DF001', NOW() - INTERVAL '6 hours', 2.1, 31.2, 65.4, 912.8),
('DF001', NOW() - INTERVAL '8 hours', 0.3, 25.6, 78.9, 745.2),
('DF001', NOW() - INTERVAL '12 hours', 0.7, 27.4, 73.6, 834.7),
('DF001', NOW() - INTERVAL '18 hours', 1.5, 26.8, 75.1, 798.4),
('DF001', NOW() - INTERVAL '24 hours', 3.2, 24.9, 81.2, 687.3),

-- DF002 - Dados climáticos do segundo dispositivo
('DF002', NOW() - INTERVAL '15 minutes', 0.1, 29.5, 69.8, 878.9),
('DF002', NOW() - INTERVAL '1 hour 15 minutes', 0.4, 28.1, 73.4, 841.2),
('DF002', NOW() - INTERVAL '2 hours 15 minutes', 0.0, 30.3, 67.2, 894.7),
('DF002', NOW() - INTERVAL '5 hours', 1.8, 27.2, 76.8, 813.5),
('DF002', NOW() - INTERVAL '8 hours', 2.5, 25.1, 79.6, 732.8),

-- DF003 - Dados climáticos do terceiro dispositivo
('DF003', NOW() - INTERVAL '25 minutes', 0.0, 27.9, 70.3, 829.4),
('DF003', NOW() - INTERVAL '1 hour 25 minutes', 0.2, 26.4, 77.1, 796.6),
('DF003', NOW() - INTERVAL '3 hours', 0.9, 25.8, 74.7, 768.2);

-- Inserir algumas mensagens de contato de exemplo (opcional)
INSERT INTO contacts (name, email, message) VALUES
('João Silva', 'joao.silva@email.com', 'Interessado em implementar o sistema na nossa propriedade rural. Podem entrar em contato?'),
('Maria Santos', 'maria.santos@fazenda.com', 'Gostaria de mais informações sobre o monitoramento de pH do solo.'),
('Pedro Oliveira', 'pedro@agricultura.com', 'Excelente projeto! Como funciona a calibração dos sensores?');

-- Verificar se os dados foram inseridos corretamente
SELECT 
    'Dispositivos cadastrados' as tabela,
    COUNT(*) as total
FROM dispositivos
UNION ALL
SELECT 
    'Medições de solo',
    COUNT(*)
FROM parametros_solo
UNION ALL
SELECT 
    'Medições climáticas',
    COUNT(*)
FROM parametros_climaticos
UNION ALL
SELECT 
    'Mensagens de contato',
    COUNT(*)
FROM contacts;
