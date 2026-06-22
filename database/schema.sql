-- ============================================================
-- YugAI Portfolio — Database Schema
-- Version: 1.0.0
-- Database: PostgreSQL 16+
-- ============================================================
--
-- Usage:
--   1. Run as superuser to create database and user:
--        psql -U postgres -f database\schema.sql
--   2. Or run the schema part only against existing DB:
--        psql -U yugai_user -d yugai -f database\schema.sql
-- ============================================================

-- ------------------------------------------------------------
-- Database & User Setup (run as superuser)
-- ------------------------------------------------------------
-- CREATE DATABASE yugai;
-- CREATE USER yugai_user WITH ENCRYPTED PASSWORD 'your_secure_password';
-- GRANT ALL PRIVILEGES ON DATABASE yugai TO yugai_user;
-- \c yugai
-- GRANT ALL ON SCHEMA public TO yugai_user;

-- ------------------------------------------------------------
-- Table: Contacts
-- Stores visitor contact form submissions
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Contacts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    subject         VARCHAR(200) NOT NULL,
    message         TEXT NOT NULL,
    is_read         BOOLEAN NOT NULL DEFAULT FALSE,
    ip_address      VARCHAR(45),
    user_agent      TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contacts_created_at ON Contacts (created_at DESC);
CREATE INDEX idx_contacts_is_read ON Contacts (is_read);

-- ------------------------------------------------------------
-- Table: ChatSessions
-- Tracks unique chat sessions per visitor
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ChatSessions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id      VARCHAR(64) NOT NULL UNIQUE,
    ip_address      VARCHAR(45),
    user_agent      TEXT,
    visitor_name    VARCHAR(100),
    message_count   INTEGER NOT NULL DEFAULT 0,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    started_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_activity   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at        TIMESTAMPTZ
);

CREATE INDEX idx_chatsessions_session_id ON ChatSessions (session_id);
CREATE INDEX idx_chatsessions_last_activity ON ChatSessions (last_activity DESC);

-- ------------------------------------------------------------
-- Table: ChatMessages
-- Stores individual chat messages within sessions
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ChatMessages (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id      VARCHAR(64) NOT NULL REFERENCES ChatSessions(session_id) ON DELETE CASCADE,
    role            VARCHAR(10) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content         TEXT NOT NULL,
    tokens_used     INTEGER,
    model_used      VARCHAR(50),
    metadata        JSONB,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_chatmessages_session ON ChatMessages (session_id, created_at ASC);
CREATE INDEX idx_chatmessages_created ON ChatMessages (created_at DESC);

-- ------------------------------------------------------------
-- Table: ProjectViews
-- Tracks which projects visitors view
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ProjectViews (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id      VARCHAR(50) NOT NULL,
    project_name    VARCHAR(100) NOT NULL,
    session_id      VARCHAR(64) REFERENCES ChatSessions(session_id) ON DELETE SET NULL,
    ip_address      VARCHAR(45),
    viewed_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projectviews_project ON ProjectViews (project_id, viewed_at DESC);
CREATE INDEX idx_projectviews_date ON ProjectViews (viewed_at);

-- ------------------------------------------------------------
-- Table: ResumeDownloads
-- Tracks resume download events
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ResumeDownloads (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id      VARCHAR(64) REFERENCES ChatSessions(session_id) ON DELETE SET NULL,
    format          VARCHAR(10) NOT NULL CHECK (format IN ('json', 'pdf')),
    ip_address      VARCHAR(45),
    downloaded_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_resumedownloads_date ON ResumeDownloads (downloaded_at DESC);

-- ------------------------------------------------------------
-- Table: PageViews
-- Tracks general page view analytics
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS PageViews (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id      VARCHAR(64) REFERENCES ChatSessions(session_id) ON DELETE SET NULL,
    page_path       VARCHAR(255) NOT NULL,
    page_title      VARCHAR(200),
    referrer        TEXT,
    ip_address      VARCHAR(45),
    user_agent      TEXT,
    view_duration   INTEGER,
    viewed_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_pageviews_path ON PageViews (page_path, viewed_at DESC);
CREATE INDEX idx_pageviews_date ON PageViews (viewed_at);

-- ------------------------------------------------------------
-- View: ChatAnalyticsSummary
-- Provides aggregated chat metrics
-- ------------------------------------------------------------
CREATE OR REPLACE VIEW ChatAnalyticsSummary AS
SELECT
    DATE(created_at) AS date,
    COUNT(DISTINCT session_id) AS unique_sessions,
    COUNT(*) FILTER (WHERE role = 'user') AS user_messages,
    COUNT(*) FILTER (WHERE role = 'assistant') AS assistant_messages,
    AVG(tokens_used) FILTER (WHERE role = 'assistant') AS avg_tokens_per_response,
    SUM(tokens_used) FILTER (WHERE role = 'assistant') AS total_tokens_used
FROM ChatMessages
GROUP BY DATE(created_at)
ORDER BY DATE(created_at) DESC;

-- ------------------------------------------------------------
-- View: ProjectPopularity
-- Ranks projects by view count
-- ------------------------------------------------------------
CREATE OR REPLACE VIEW ProjectPopularity AS
SELECT
    project_id,
    project_name,
    COUNT(*) AS total_views,
    COUNT(DISTINCT session_id) AS unique_visitors,
    MIN(viewed_at) AS first_viewed,
    MAX(viewed_at) AS last_viewed
FROM ProjectViews
GROUP BY project_id, project_name
ORDER BY total_views DESC;

-- ------------------------------------------------------------
-- Function: cleanup_old_chat_sessions()
-- Archives sessions older than 90 days
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION cleanup_old_chat_sessions()
RETURNS void AS $$
BEGIN
    UPDATE ChatSessions
    SET is_active = FALSE, ended_at = NOW()
    WHERE is_active = TRUE
      AND last_activity < NOW() - INTERVAL '90 days';

    DELETE FROM ChatMessages
    WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------
-- Trigger: auto_update_timestamp
-- Auto-updates updated_at on Contacts
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_contacts_updated_at
    BEFORE UPDATE ON Contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ------------------------------------------------------------
-- Seed data: Not applicable (data comes from knowledge base JSON)
-- ------------------------------------------------------------

-- ------------------------------------------------------------
-- Rollback (for migration scripts)
-- ------------------------------------------------------------
-- DROP TRIGGER IF EXISTS trg_contacts_updated_at ON Contacts;
-- DROP FUNCTION IF EXISTS update_updated_at_column();
-- DROP FUNCTION IF EXISTS cleanup_old_chat_sessions();
-- DROP VIEW IF EXISTS ProjectPopularity;
-- DROP VIEW IF EXISTS ChatAnalyticsSummary;
-- DROP TABLE IF EXISTS PageViews;
-- DROP TABLE IF EXISTS ResumeDownloads;
-- DROP TABLE IF EXISTS ProjectViews;
-- DROP TABLE IF EXISTS ChatMessages;
-- DROP TABLE IF EXISTS ChatSessions;
-- DROP TABLE IF EXISTS Contacts;

-- ============================================================
-- End of Schema
-- ============================================================
