-- Script SQL para configurar as tabelas do Sistema de Monitoramento Agrícola SBESC 2025

-- Tabela para armazenar dispositivos finais (DF)
CREATE TABLE IF NOT EXISTS dispositivos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_dispositivo VARCHAR(50) UNIQUE NOT NULL,
  nome VARCHAR(255) NOT NULL,
  localizacao VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  data_cadastro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ativo BOOLEAN DEFAULT true
);

-- Tabela para parâmetros do solo
CREATE TABLE IF NOT EXISTS parametros_solo (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_dispositivo VARCHAR(50) NOT NULL REFERENCES dispositivos(id_dispositivo),
  data_hora TIMESTAMP WITH TIME ZONE NOT NULL,
  ph DECIMAL(4, 2),
  condutividade_eletrica DECIMAL(8, 2), -- mS/cm
  temperatura_solo DECIMAL(5, 2), -- °C
  umidade_solo DECIMAL(5, 2), -- %
  nitrogenio DECIMAL(8, 2), -- mg/kg
  fosforo DECIMAL(8, 2), -- mg/kg
  potassio DECIMAL(8, 2), -- mg/kg
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para armazenar mensagens de contato (mantida para a landing page)
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS) em todas as tabelas
ALTER TABLE dispositivos ENABLE ROW LEVEL SECURITY;
ALTER TABLE parametros_solo ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_parametros_solo_dispositivo_data ON parametros_solo(id_dispositivo, data_hora DESC);
CREATE INDEX IF NOT EXISTS idx_parametros_solo_data ON parametros_solo(data_hora DESC);

-- Comentários para documentação
COMMENT ON TABLE dispositivos IS 'Tabela para cadastro de dispositivos finais (DF) de monitoramento';
COMMENT ON TABLE parametros_solo IS 'Tabela para armazenar medições dos parâmetros do solo';
COMMENT ON TABLE contacts IS 'Tabela para mensagens do formulário de contato da landing page';

-- Inserir um dispositivo de exemplo
INSERT INTO dispositivos (id_dispositivo, nome, localizacao, latitude, longitude) 
VALUES ('DF001', 'Estação Principal', 'Fazenda Experimental', -23.5505, -46.6333)
ON CONFLICT (id_dispositivo) DO NOTHING;
