package billing

import (
	"bytes"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"gorm.io/gorm"
)

type YooKassaPaymentService struct {
	db          *gorm.DB
	ShopID      string
	APIKey      string
	APIEndpoint string
}

type CreatePaymentRequest struct {
	Amount struct {
		Value    string `json:"value"`
		Currency string `json:"currency"`
	} `json:"amount"`
	Description      string `json:"description"`
	ReturnURL        string `json:"return_url"`
	Metadata         map[string]interface{} `json:"metadata"`
	Confirmation     map[string]string `json:"confirmation"`
}

type PaymentResponse struct {
	ID        string `json:"id"`
	Status    string `json:"status"`
	Amount    struct {
		Value    string `json:"value"`
		Currency string `json:"currency"`
	} `json:"amount"`
	Confirmation struct {
		Type      string `json:"type"`
		ReturnURL string `json:"return_url"`
	} `json:"confirmation"`
	CreatedAt string `json:"created_at"`
}

func NewYooKassaPaymentService(db *gorm.DB, shopID, apiKey string) *YooKassaPaymentService {
	return &YooKassaPaymentService{
		db:          db,
		ShopID:      shopID,
		APIKey:      apiKey,
		APIEndpoint: "https://api.yookassa.ru/v3",
	}
}

func (ps *YooKassaPaymentService) CreatePayment(userID int, planID int, amount string, description string, returnURL string) (*PaymentResponse, error) {
	paymentReq := CreatePaymentRequest{
		Description: description,
		ReturnURL:   returnURL,
		Metadata: map[string]interface{}{
			"user_id": userID,
			"plan_id": planID,
		},
	}

	paymentReq.Amount.Value = amount
	paymentReq.Amount.Currency = "RUB"

	paymentReq.Confirmation.Type = "redirect"
	paymentReq.Confirmation.ReturnURL = returnURL

	payloadBytes, err := json.Marshal(paymentReq)
	if err != nil {
		return nil, fmt.Errorf("error marshaling payment request: %w", err)
	}

	req, err := http.NewRequest("POST", ps.APIEndpoint+"/payments", bytes.NewBuffer(payloadBytes))
	if err != nil {
		return nil, fmt.Errorf("error creating request: %w", err)
	}

	auth := base64.StdEncoding.EncodeToString([]byte(ps.ShopID + ":" + ps.APIKey))
	req.Header.Add("Authorization", "Basic "+auth)
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Idempotency-Key", fmt.Sprintf("%d-%d-%d", userID, planID, time.Now().Unix()))

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("error making payment request: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("error reading response body: %w", err)
	}

	var paymentResp PaymentResponse
	if err := json.Unmarshal(body, &paymentResp); err != nil {
		return nil, fmt.Errorf("error unmarshaling payment response: %w", err)
	}

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		return nil, fmt.Errorf("yookassa error: status %d, response: %s", resp.StatusCode, string(body))
	}

	return &paymentResp, nil
}

func (ps *YooKassaPaymentService) VerifyWebhook(body []byte, signature string) bool {
	hash := sha256.Sum256(body)
	expectedSig := base64.StdEncoding.EncodeToString(hash[:])
	return signature == expectedSig
}

func (ps *YooKassaPaymentService) ProcessWebhook(webhookData map[string]interface{}) error {
	// Process webhook from YooKassa
	// Update subscription status in database
	// Handle payment confirmation
	return nil
}
