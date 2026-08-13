-- Adicionar tabela de alertas ao schema

CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_alerts_user_id ON alerts(user_id);
CREATE INDEX idx_alerts_read ON alerts(read);
CREATE INDEX idx_alerts_created_at ON alerts(created_at DESC);

-- Comentários
COMMENT ON TABLE alerts IS 'Sistema de notificações e alertas do usuário';
COMMENT ON COLUMN alerts.type IS 'Tipo: currency, rent, flight, visa, goal, system';
COMMENT ON COLUMN alerts.data IS 'Dados adicionais em JSON';