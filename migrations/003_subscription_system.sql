-- Subscription System Migration
-- Creates all tables for billing, subscriptions, and payments

CREATE TABLE IF NOT EXISTS subscription_plan (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    base_price_rub DECIMAL(10, 2) DEFAULT 0,
    video_retention_days INT DEFAULT 7,
    messages_retention_days INT DEFAULT 30,
    posts_retention_days INT DEFAULT 15,
    logs_retention_days INT DEFAULT 45,
    boards_persist_flag BOOLEAN DEFAULT FALSE,
    jarvis_daily_limit INT DEFAULT 3,
    overage_storage_enabled BOOLEAN DEFAULT FALSE,
    traffic_reports_enabled BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS seat_pricing (
    id SERIAL PRIMARY KEY,
    plan_id INT REFERENCES subscription_plan(id) ON DELETE CASCADE,
    seat_type VARCHAR(50) NOT NULL,
    price_per_month_rub DECIMAL(10, 2) NOT NULL,
    min_seats INT DEFAULT 0,
    max_seats INT DEFAULT NULL,
    is_billable BOOLEAN DEFAULT TRUE,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(plan_id, seat_type)
);

CREATE TABLE IF NOT EXISTS overage_pricing (
    id SERIAL PRIMARY KEY,
    plan_id INT REFERENCES subscription_plan(id) ON DELETE CASCADE,
    metric_type VARCHAR(50) NOT NULL,
    price_rub DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS org_subscription (
    id SERIAL PRIMARY KEY,
    org_id INT NOT NULL,
    plan_id INT REFERENCES subscription_plan(id),
    seats_student_editor INT DEFAULT 0,
    seats_staff INT DEFAULT 0,
    starts_at TIMESTAMP NOT NULL,
    ends_at TIMESTAMP NOT NULL,
    grace_until TIMESTAMP,
    auto_renew BOOLEAN DEFAULT TRUE,
    payment_provider VARCHAR(50),
    billing_period VARCHAR(20) DEFAULT 'monthly',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS org_entitlement (
    id SERIAL PRIMARY KEY,
    org_id INT NOT NULL,
    feature_key VARCHAR(100) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    limits_json JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(org_id, feature_key)
);

CREATE TABLE IF NOT EXISTS storage_overage_daily (
    id SERIAL PRIMARY KEY,
    org_id INT NOT NULL,
    date DATE NOT NULL,
    bytes_over_retention BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(org_id, date)
);

CREATE TABLE IF NOT EXISTS donation_settings (
    id SERIAL PRIMARY KEY,
    min_amount_rub DECIMAL(10, 2) DEFAULT 20.00,
    default_amounts_json JSONB DEFAULT '[20, 50, 100, 500]',
    thank_you_message TEXT DEFAULT 'Спасибо за поддержку!',
    is_enabled BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS donation (
    id SERIAL PRIMARY KEY,
    user_id INT,
    amount_rub DECIMAL(10, 2) NOT NULL,
    payment_provider VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pricing_change_log (
    id SERIAL PRIMARY KEY,
    changed_by_user_id INT,
    table_name VARCHAR(100) NOT NULL,
    record_id INT NOT NULL,
    field_name VARCHAR(100) NOT NULL,
    old_value TEXT,
    new_value TEXT,
    reason TEXT,
    changed_at TIMESTAMP DEFAULT NOW()
);

-- Insert default subscription plans
INSERT INTO subscription_plan (slug, name, base_price_rub, video_retention_days, messages_retention_days, boards_persist_flag, jarvis_daily_limit, overage_storage_enabled)
VALUES 
    ('free', 'Free', 0, 7, 30, FALSE, 3, FALSE),
    ('edu_basic', 'Edu Basic', 0, 14, 60, FALSE, 10, TRUE),
    ('edu_pro', 'Edu Pro', 2000, 60, 180, TRUE, 50, TRUE)
ON CONFLICT (slug) DO NOTHING;

-- Insert seat pricing for Edu Basic and Edu Pro
INSERT INTO seat_pricing (plan_id, seat_type, price_per_month_rub, is_billable)
VALUES 
    (2, 'student_editor', 35.00, TRUE),
    (2, 'staff', 500.00, TRUE),
    (2, 'reader', 0.00, FALSE),
    (3, 'student_editor', 35.00, TRUE),
    (3, 'staff', 500.00, TRUE),
    (3, 'reader', 0.00, FALSE)
ON CONFLICT (plan_id, seat_type) DO NOTHING;

-- Insert overage pricing
INSERT INTO overage_pricing (plan_id, metric_type, price_rub, unit)
VALUES 
    (2, 'storage_gb_month', 50.00, 'GB·месяц'),
    (3, 'storage_gb_month', 50.00, 'GB·месяц'),
    (3, 'jarvis_request_pack', 100.00, '50 запросов')
ON CONFLICT DO NOTHING;

-- Insert default donation settings
INSERT INTO donation_settings (id) VALUES (1) ON CONFLICT DO NOTHING;
