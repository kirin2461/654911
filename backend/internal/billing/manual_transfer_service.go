package billing

import (
	"errors"
	"fmt"
	"log"
	"time"

	"gorm.io/gorm"
)

// ManualPaymentRequest - запрос на ручный платёж
type ManualPaymentRequest struct {
	OrgID       int     `json:"org_id"`
	AmountRub   float64 `json:"amount_rub"`
	Last4Digits string  `json:"last4_digits"`
}

// ManualPaymentResponse - ответ
type ManualPaymentResponse struct {
	PaymentID int    `json:"payment_id"`
	Status    string `json:"status"`
	Message   string `json:"message"`
}

// ManualTransferService - сервис для ручных платежей
type ManualTransferService struct {
	db *gorm.DB
}

// NewManualTransferService - конструктор
func NewManualTransferService(db *gorm.DB) *ManualTransferService {
	return &ManualTransferService{db: db}
}

// CreateManualPayment - создать платёж в статусе pending_verification
func (m *ManualTransferService) CreateManualPayment(req *ManualPaymentRequest) (*ManualPaymentResponse, error) {
	if req.AmountRub < 100 {
		return nil, errors.New("сумма меньше 100 рублей")
	}

	if len(req.Last4Digits) != 4 {
		return nil, errors.New("последние 4 цифры должны быть от 0 до 4 символов")
	}

	// Сохранить в BD
	payment := map[string]interface{}{
		"org_id":         req.OrgID,
		"amount_rub":     req.AmountRub,
		"payment_provider": "manual_transfer",
		"status":         "pending_verification",
		"created_at":     time.Now(),
	}

	result := m.db.Table("donations").Create(payment)
	if result.Error != nil {
		log.Printf("Error creating manual payment: %v", result.Error)
		return nil, result.Error
	}

	return &ManualPaymentResponse{
		PaymentID: int(result.LastInsertedID),
		Status:    "pending_verification",
		Message:   fmt.Sprintf("Платёж составляет %.2f рублей. Ожидают верификации администратором.", req.AmountRub),
	}, nil
}

// ConfirmPayment - подтвердить платёж админом
func (m *ManualTransferService) ConfirmPayment(paymentID int, adminID int) error {
	result := m.db.Table("donations").
		Where("id = ? AND status = ?", paymentID, "pending_verification").
		Updates(map[string]interface{}{
			"status": "paid",
		})

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("платёж не найден или уже подтверждён")
	}

	log.Printf("Payment %d confirmed by admin %d", paymentID, adminID)
	return nil
}

// RejectPayment - отклонить платёж
func (m *ManualTransferService) RejectPayment(paymentID int, reason string) error {
	result := m.db.Table("donations").
		Where("id = ? AND status = ?", paymentID, "pending_verification").
		Updates(map[string]interface{}{
			"status": "failed",
		})

	if result.Error != nil {
		return result.Error
	}

	if result.RowsAffected == 0 {
		return errors.New("платёж не найден или уже обработан")
	}

	log.Printf("Payment %d rejected. Reason: %s", paymentID, reason)
	return nil
}

// GetPendingPayments - получить все ожидающие платежи
func (m *ManualTransferService) GetPendingPayments() ([]map[string]interface{}, error) {
	var payments []map[string]interface{}
	result := m.db.Table("donations").
		Where("status = ?", "pending_verification").
		Order("created_at DESC").
		Scan(&payments)

	if result.Error != nil {
		return nil, result.Error
	}

	return payments, nil
}
