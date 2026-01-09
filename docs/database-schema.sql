-- Schema do Banco de Dados PostgreSQL - ForteGB
-- Este arquivo serve como referência para criação das tabelas no Supabase

-- Tabela de Casas/Propriedades
CREATE TABLE IF NOT EXISTS houses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  full_description TEXT,
  main_image VARCHAR(500),
  area INTEGER,
  bedrooms INTEGER,
  bathrooms INTEGER,
  price DECIMAL(12, 2),
  status VARCHAR(50) DEFAULT 'disponivel', -- disponivel, vendido, em-construcao, reservado
  qr_code VARCHAR(255) UNIQUE, -- Código QR para acesso instantâneo
  tuya_device_id VARCHAR(255), -- ID do dispositivo Tuya (smart lock)
  location JSONB, -- Coordenadas, endereço, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Corretores
CREATE TABLE IF NOT EXISTS realtors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  realtor_id UUID REFERENCES realtors(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  house_id UUID REFERENCES houses(id) ON DELETE SET NULL,
  visit_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, visit_scheduled, visit_completed, negotiating, closed_won, closed_lost
  hubspot_contact_id VARCHAR(255),
  hubspot_deal_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- Proteção de comissão: primeiro corretor que registra o lead ganha
  UNIQUE(phone, house_id)
);

-- Tabela de Visitas
CREATE TABLE IF NOT EXISTS visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  house_id UUID REFERENCES houses(id) ON DELETE SET NULL,
  visitor_name VARCHAR(255) NOT NULL,
  visitor_phone VARCHAR(50),
  visitor_email VARCHAR(255),
  visit_date TIMESTAMP WITH TIME ZONE NOT NULL,
  password VARCHAR(50), -- Senha temporária para smart lock
  password_expires_at TIMESTAMP WITH TIME ZONE,
  verification_data JSONB, -- Dados de verificação de identidade
  selfie_photo TEXT, -- Base64 ou URL (deletar após 30 dias)
  document_photo TEXT, -- Base64 ou URL (deletar após 30 dias)
  status VARCHAR(50) DEFAULT 'scheduled', -- scheduled, instant, completed, cancelled
  qr_code VARCHAR(255), -- Código QR usado (se visita instantânea)
  calendar_event_id VARCHAR(255), -- ID do evento no Google Calendar
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Posts do Blog (se não usar Contentful)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image VARCHAR(500),
  category VARCHAR(100),
  tags TEXT[],
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Contatos (formulário de contato)
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_houses_status ON houses(status);
CREATE INDEX IF NOT EXISTS idx_houses_slug ON houses(slug);
CREATE INDEX IF NOT EXISTS idx_houses_qr_code ON houses(qr_code);
CREATE INDEX IF NOT EXISTS idx_leads_realtor_id ON leads(realtor_id);
CREATE INDEX IF NOT EXISTS idx_leads_house_id ON leads(house_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone);
CREATE INDEX IF NOT EXISTS idx_visits_house_id ON visits(house_id);
CREATE INDEX IF NOT EXISTS idx_visits_visit_date ON visits(visit_date);
CREATE INDEX IF NOT EXISTS idx_visits_qr_code ON visits(qr_code);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_houses_updated_at BEFORE UPDATE ON houses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_realtors_updated_at BEFORE UPDATE ON realtors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_visits_updated_at BEFORE UPDATE ON visits
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();



