-- ============================================================
-- YugAI Portfolio — Database Schema (MariaDB / MySQL)
-- Version: 1.0.0
-- Database: MariaDB 10.7+ / MySQL 8.0+
-- ============================================================

-- ------------------------------------------------------------
-- Table: Contacts
-- Stores visitor contact form submissions
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS Contacts (
    id              CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name            VARCHAR(100) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    subject         VARCHAR(200) NOT NULL,
    message         TEXT NOT NULL,
    is_read         BOOLEAN NOT NULL DEFAULT FALSE,
    ip_address      VARCHAR(45),
    user_agent      TEXT,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_contacts_created_at ON Contacts (created_at DESC);
CREATE INDEX idx_contacts_is_read ON Contacts (is_read);

-- ------------------------------------------------------------
-- Table: ChatSessions
-- Tracks unique chat sessions per visitor
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ChatSessions (
    id              CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    session_id      VARCHAR(64) NOT NULL UNIQUE,
    ip_address      VARCHAR(45),
    user_agent      TEXT,
    visitor_name    VARCHAR(100),
    message_count   INTEGER NOT NULL DEFAULT 0,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    started_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_activity   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ended_at        TIMESTAMP NULL
);

CREATE INDEX idx_chatsessions_session_id ON ChatSessions (session_id);
CREATE INDEX idx_chatsessions_last_activity ON ChatSessions (last_activity DESC);

-- ------------------------------------------------------------
-- Table: ChatMessages
-- Stores individual chat messages within sessions
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ChatMessages (
    id              CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    session_id      VARCHAR(64) NOT NULL,
    role            VARCHAR(10) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content         TEXT NOT NULL,
    tokens_used     INTEGER,
    model_used      VARCHAR(50),
    metadata        JSON,
    created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES ChatSessions(session_id) ON DELETE CASCADE
);

CREATE INDEX idx_chatmessages_session ON ChatMessages (session_id, created_at ASC);
CREATE INDEX idx_chatmessages_created ON ChatMessages (created_at DESC);

-- ------------------------------------------------------------
-- Table: ProjectViews
-- Tracks which projects visitors view
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ProjectViews (
    id              CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    project_id      VARCHAR(50) NOT NULL,
    project_name    VARCHAR(100) NOT NULL,
    session_id      VARCHAR(64),
    ip_address      VARCHAR(45),
    viewed_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES ChatSessions(session_id) ON DELETE SET NULL
);

CREATE INDEX idx_projectviews_project ON ProjectViews (project_id, viewed_at DESC);
CREATE INDEX idx_projectviews_date ON ProjectViews (viewed_at);

-- ------------------------------------------------------------
-- Table: ResumeDownloads
-- Tracks resume download events
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ResumeDownloads (
    id              CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    session_id      VARCHAR(64),
    format          VARCHAR(10) NOT NULL CHECK (format IN ('json', 'pdf')),
    ip_address      VARCHAR(45),
    downloaded_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES ChatSessions(session_id) ON DELETE SET NULL
);

CREATE INDEX idx_resumedownloads_date ON ResumeDownloads (downloaded_at DESC);

-- ------------------------------------------------------------
-- Table: PageViews
-- Tracks general page view analytics
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS PageViews (
    id              CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    session_id      VARCHAR(64),
    page_path       VARCHAR(255) NOT NULL,
    page_title      VARCHAR(200),
    referrer        TEXT,
    ip_address      VARCHAR(45),
    user_agent      TEXT,
    view_duration   INTEGER,
    viewed_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES ChatSessions(session_id) ON DELETE SET NULL
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
    SUM(CASE WHEN role = 'user' THEN 1 ELSE 0 END) AS user_messages,
    SUM(CASE WHEN role = 'assistant' THEN 1 ELSE 0 END) AS assistant_messages,
    AVG(CASE WHEN role = 'assistant' THEN tokens_used ELSE NULL END) AS avg_tokens_per_response,
    SUM(CASE WHEN role = 'assistant' THEN tokens_used ELSE 0 END) AS total_tokens_used
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
-- Procedure: cleanup_old_chat_sessions()
-- Archives sessions older than 90 days
-- ------------------------------------------------------------
DELIMITER //
CREATE OR REPLACE PROCEDURE cleanup_old_chat_sessions()
BEGIN
    UPDATE ChatSessions
    SET is_active = FALSE, ended_at = NOW()
    WHERE is_active = TRUE
      AND last_activity < NOW() - INTERVAL 90 DAY;

    DELETE FROM ChatMessages
    WHERE created_at < NOW() - INTERVAL 90 DAY;
END //
DELIMITER ;

-- ------------------------------------------------------------
-- Event: auto_cleanup_chat_sessions
-- Runs cleanup daily
-- ------------------------------------------------------------
DELIMITER //
CREATE OR REPLACE EVENT auto_cleanup_chat_sessions
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO
BEGIN
    CALL cleanup_old_chat_sessions();
END //
DELIMITER ;

-- ============================================================
-- Rollback (for migration scripts)
-- ============================================================
-- DROP EVENT IF EXISTS auto_cleanup_chat_sessions;
-- DROP PROCEDURE IF EXISTS cleanup_old_chat_sessions();
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
