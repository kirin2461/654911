package billing

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/robfig/cron/v3"
	"gorm.io/gorm"
)

type BillingScheduler struct {
	db *gorm.DB
	cron *cron.Cron
	paymentService *YooKassaPaymentService
}

type Subscription struct {
	ID                   int       `gorm:"primaryKey"`
	UserID               int
	PlanID               int
	Status               string
	CurrentPeriodStart   time.Time
	CurrentPeriodEnd     time.Time
	CreatedAt            time.Time
	UpdatedAt            time.Time
}

type SubscriptionPlan struct {
	ID               int
	Slug             string
	Name             string
	Price            float64
	Currency         string
	BasePriceNote    string
	BillingCycle     string
}

func NewBillingScheduler(db *gorm.DB, paymentService *YooKassaPaymentService) *BillingScheduler {
	return &BillingScheduler{
		db:             db,
		cron:           cron.New(),
		paymentService: paymentService,
	}
}

func (bs *BillingScheduler) Start() error {
	// Schedule monthly billing at 00:00 UTC on the 1st of each month
	_, err := bs.cron.AddFunc("0 0 1 * *", bs.ProcessMonthlyBilling)
	if err != nil {
		return fmt.Errorf("error adding cron job: %w", err)
	}

	bs.cron.Start()
	log.Println("Billing scheduler started")
	return nil
}

func (bs *BillingScheduler) Stop() {
	bs.cron.Stop()
	log.Println("Billing scheduler stopped")
}

func (bs *BillingScheduler) ProcessMonthlyBilling() {
	log.Println("Processing monthly billing...")
	ctx := context.Background()

	// Get all active subscriptions
	var subscriptions []Subscription
	if err := bs.db.Where("status = ?", "active").Find(&subscriptions).Error; err != nil {
		log.Printf("Error fetching subscriptions: %v", err)
		return
	}

	for _, sub := range subscriptions {
		// Check if billing period has ended
		if time.Now().After(sub.CurrentPeriodEnd) {
			if err := bs.chargePlan(ctx, &sub); err != nil {
				log.Printf("Error charging subscription %d: %v", sub.ID, err)
				continue
			}
		}
	}

	log.Println("Monthly billing processing completed")
}

func (bs *BillingScheduler) chargePlan(ctx context.Context, sub *Subscription) error {
	var plan SubscriptionPlan
	if err := bs.db.Where("id = ?", sub.PlanID).First(&plan).Error; err != nil {
		return fmt.Errorf("error fetching plan: %w", err)
	}

	// Create payment via YooKassa
	_, err := bs.paymentService.CreatePayment(
		sub.UserID,
		sub.PlanID,
		fmt.Sprintf("%.2f", plan.Price),
		fmt.Sprintf("Monthly subscription renewal - %s", plan.Name),
		"https://example.com/billing/success",
	)
	if err != nil {
		return fmt.Errorf("error creating payment: %w", err)
	}

	// Update subscription period
	newStart := sub.CurrentPeriodEnd
	newEnd := newStart.AddDate(0, 1, 0) // Add 1 month

	if err := bs.db.Model(sub).Updates(map[string]interface{}{
		"current_period_start": newStart,
		"current_period_end":   newEnd,
		"updated_at":           time.Now(),
	}).Error; err != nil {
		return fmt.Errorf("error updating subscription: %w", err)
	}

	log.Printf("Charged subscription %d for plan %d", sub.ID, sub.PlanID)
	return nil
}
