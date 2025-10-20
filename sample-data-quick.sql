-- Insert rápido para teste do dashboard - Execute no SQL Editor do Supabase

-- Inserir dispositivo (se não existir)
INSERT INTO dispositivos (id_dispositivo, nome, localizacao, latitude, longitude) 
VALUES ('DF001', 'Estação Principal', 'Fazenda Experimental', -23.5505, -46.6333)
ON CONFLICT (id_dispositivo) DO NOTHING;

-- Inserir alguns dados de solo recentes
INSERT INTO parametros_solo (id_dispositivo, data_hora, ph, condutividade_eletrica, temperatura_solo, umidade_solo, nitrogenio, fosforo, potassio) VALUES
('DF001', NOW(), 6.8, 1.2, 25.5, 68.2, 45.8, 12.3, 156.7),
('DF001', NOW() - INTERVAL '1 hour', 6.7, 1.1, 24.8, 65.1, 44.2, 11.9, 152.3),
('DF001', NOW() - INTERVAL '2 hours', 6.9, 1.3, 26.1, 69.8, 47.1, 13.2, 158.9),
('DF001', NOW() - INTERVAL '3 hours', 6.6, 1.0, 23.9, 62.4, 43.5, 11.2, 149.8),
('DF001', NOW() - INTERVAL '4 hours', 6.8, 1.2, 25.3, 66.7, 46.2, 12.1, 154.6);

-- Inserir alguns dados climáticos recentes
INSERT INTO parametros_climaticos (id_dispositivo, data_hora, chuva, temperatura_ar, umidade_ar, radiacao_solar) VALUES
('DF001', NOW(), 0.0, 28.3, 72.1, 845.6),
('DF001', NOW() - INTERVAL '1 hour', 0.5, 27.8, 74.2, 823.4),
('DF001', NOW() - INTERVAL '2 hours', 1.2, 29.1, 68.9, 867.2),
('DF001', NOW() - INTERVAL '3 hours', 0.8, 26.9, 76.3, 789.1),
('DF001', NOW() - INTERVAL '4 hours', 0.0, 28.7, 71.5, 856.3);
