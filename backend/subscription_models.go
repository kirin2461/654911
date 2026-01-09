package main

import "time"

// SubscriptionPlan - модель для плана подписки
type SubscriptionPlan struct {
	ID                      int       `gorm:"primaryKey" json:"id"`
	Slug                    string    `gorm:"uniqueIndex" json:"slug"`
	Name                    string    `json:"name"`
	Description             string    `json:"description"`
	BasePriceRub            float64   `json:"base_price_rub"`
	VideoRetentionDays      int       `json:"video_retention_days"`
	MessagesRetentionDays   int       `json:"messages_retention_days"`
	PostsRetentionDays      int       `json:"posts_retention_days"`
	LogsRetentionDays       int       `json:"logs_retention_days"`
	BoardsPersistFlag       bool      `json:"boards_persist_flag"`
	JarvisDailyLimit        int       `json:"jarvis_daily_limit"`
	OverageStorageEnabled   bool      `json:"overage_storage_enabled"`
	TrafficReportsEnabled   bool      `json:"traffic_reports_enabled"`
	IsActive                bool      `json:"is_active"`
	CreatedAt               time.Time `json:"created_at"`
	UpdatedAt               time.Time `json:"updated_at"`
}

// SeatPricing - цена на роль
type SeatPricing struct {
	ID                 int       `gorm:"primaryKey" json:"id"`
	PlanID             int       `gorm:"foreignKey" json:"plan_id"`
	SeatType           string    `json:"seat_type"`
	PricePerMonthRub   float64   `json:"price_per_month_rub"`
	MinSeats           int       `json:"min_seats"`
	MaxSeats           *int      `json:"max_seats"`
	IsBillable         bool      `json:"is_billable"`
	Description        string    `json:"description"`
	IsActive           bool      `json:"is_active"`
	CreatedAt          time.Time `json:"created_at"`
	UpdatedAt          time.Time `json:"updated_at"`
}

// OveragePricing - цена на overage
type OveragePricing struct {
	ID          int       `gorm:"primaryKey" json:"id"`
	PlanID      *int      `json:"plan_id"`
	MetricType  string    `json:"metric_type"`
	PriceRub    float64   `json:"price_rub"`
	Unit        string    `json:"unit"`
	Description string    `json:"description"`
	IsActive    bool      `json:"is_active"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// Org - организация
type Org struct {
	ID        int       `gorm:"primaryKey" json:"id"`
	Name      string    `json:"name"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// OrgSubscription - подписка организации
type OrgSubscription struct {
	ID                   int       `gorm:"primaryKey" json:"id"`
	OrgID                int       `gorm:"foreignKey" json:"org_id"`
	PlanID               int       `json:"plan_id"`
	SeatsStudentEditor   int       `json:"seats_student_editor"`
	SeatsStaff           int       `json:"seats_staff"`
	StartsAt             time.Time `json:"starts_at"`
	EndsAt               time.Time `json:"ends_at"`
	GraceUntil           *time.Time `json:"grace_until"`
	AutoRenew            bool      `json:"auto_renew"`
	PaymentProvider      string    `json:"payment_provider"`
	BillingPeriod        string    `json:"billing_period"`
	Status               string    `json:"status"`
	CreatedAt            time.Time `json:"created_at"`
	UpdatedAt            time.Time `json:"updated_at"`
}

// OrgEntitlement - право доступа организации
type OrgEntitlement struct {
	ID        int       `gorm:"primaryKey" json:"id"`
	OrgID     int       `gorm:"foreignKey" json:"org_id"`
	FeatureKey string   `json:"feature_key"`
	Enabled   bool      `json:"enabled"`
	LimitsJSON string    `gorm:"type:jsonb" json:"limits_json"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// StorageOverageDaily - ежедневный overage
type StorageOverageDaily struct {
	ID                 int       `gorm:"primaryKey" json:"id"`
	OrgID              int       `gorm:"foreignKey" json:"org_id"`
	Date               time.Time `json:"date"`
	BytesOverRetention int64     `json:"bytes_over_retention"`
	CreatedAt          time.Time `json:"created_at"`
}

// DonationSettings - настройки донатов
type DonationSettings struct {
	ID                 int       `gorm:"primaryKey" json:"id"`
	MinAmountRub       float64   `json:"min_amount_rub"`
	DefaultAmountsJSON string    `gorm:"type:jsonb" json:"default_amounts_json"`
	ThankYouMessage    string    `json:"thank_you_message"`
	IsEnabled          bool      `json:"is_enabled"`
	UpdatedAt          time.Time `json:"updated_at"`
}

// Donation - запись о донате
type Donation struct {
	ID              int       `gorm:"primaryKey" json:"id"`
	UserID          *int      `json:"user_id"`
	AmountRub       float64   `json:"amount_rub"`
	PaymentProvider string    `json:"payment_provider"`
	Status          string    `json:"status"`
	CreatedAt       time.Time `json:"created_at"`
}

// PricingChangeLog - лог изменений
type PricingChangeLog struct {
	ID             int       `gorm:"primaryKey" json:"id"`
	ChangedByUserID int      `json:"changed_by_user_id"`
	TableName      string    `json:"table_name"`
	RecordID       int       `json:"record_id"`
	FieldName      string    `json:"field_name"`
	OldValue       string    `json:"old_value"`
	NewValue       string    `json:"new_value"`
	Reason         string    `json:"reason"`
	ChangedAt      time.Time `json:"changed_at"`
}
