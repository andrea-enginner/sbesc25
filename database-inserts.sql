-- Script de inicialização para o banco MySQL do sistema SBESC 2025
-- Crie e execute este script no seu servidor MySQL

CREATE TABLE IF NOT EXISTS parametro_solo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ph DECIMAL(4,2) NOT NULL
);

INSERT INTO parametro_solo (ph) VALUES
(6.8),
(6.6),
(6.9),
(7.1),
(6.4),
(6.7),
(7.0),
(6.5),
(7.2),
(6.3);
