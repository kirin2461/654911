package routes

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/kirin2461/Nemaxks/backend/internal/billing"
	"gorm.io/gorm"
)

// SubscriptionRoutes registers all subscription-related API endpoints
func SubscriptionRoutes(router *gin.Engine, db *gorm.DB) {
	subService := billing.NewSubscriptionService(db)

	// Public routes (no auth required for some)
	router.GET("/api/subscription/plans", getSubscriptionPlans)
	router.GET("/api/subscription/plans/:id", getSubscriptionPlan)

	// Protected routes (auth required)
	protected := router.Group("/api/subscription")
	// Add authentication middleware here in production
	{
		// Get current organization subscription
		protected.GET("/current", func(c *gin.Context) {
			orgIDStr := c.GetString("org_id") // From auth middleware
			orgID, err := strconv.Atoi(orgIDStr)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "invalid org_id"})
				return
			}

			sub, err := subService.GetOrgSubscription(c.Request.Context(), orgID)
			if err != nil {
				c.JSON(http.StatusNotFound, gin.H{"error": "subscription not found"})
				return
			}

			c.JSON(http.StatusOK, gin.H{
				"org_id":         sub.OrgID,
				"plan_id":        sub.PlanID,
				"seats_students": sub.SeatsStudentEditor,
				"seats_staff":    sub.SeatsStaff,
				"status":         sub.Status,
				"expires_at":     sub.EndsAt,
				"auto_renew":     sub.AutoRenew,
			})
		})

		// Get monthly charge for organization
		protected.GET("/monthly-charge", func(c *gin.Context) {
			argOrgID := c.GetString("org_id")
			argPlanID := c.DefaultQuery("plan_id", "2")

			orgID, _ := strconv.Atoi(argOrgID)
			planID, _ := strconv.Atoi(argPlanID)

			charge, err := subService.CalculateMonthlyCharge(c.Request.Context(), orgID, planID)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "calculation failed"})
				return
			}

			c.JSON(http.StatusOK, gin.H{
				"monthly_charge_rub": charge,
				"currency":           "RUB",
				"billing_cycle":      "monthly",
			})
		})

		// Check if feature is available
		protected.GET("/features/:feature", func(c *gin.Context) {
			argOrgID := c.GetString("org_id")
			feature := c.Param("feature")

			orgID, _ := strconv.Atoi(argOrgID)

			hasFeature, err := subService.HasPlanFeature(c.Request.Context(), orgID, feature)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": "feature check failed"})
				return
			}

			c.JSON(http.StatusOK, gin.H{
				"feature":     feature,
				"available":   hasFeature,
				"requires":    "active subscription",
			})
		})

		// Purchase or upgrade subscription (stub)
		protected.POST("/purchase", func(c *gin.Context) {
			var req struct {
				PlanID int `json:"plan_id" binding:"required"`
			}

			if err := c.BindJSON(&req); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
				return
			}

			// In production: create order, initiate payment flow
			c.JSON(http.StatusOK, gin.H{
				"status":      "pending_payment",
				"plan_id":     req.PlanID,
				"message":     "Proceed to payment page",
				"redirect_url": "/checkout",
			})
		})
	}
}

// Stub handlers for public endpoints
func getSubscriptionPlans(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"plans": []map[string]interface{}{
			{
				"id":    1,
				"slug":  "free",
				"name":  "Free",
				"price": 0,
			},
			{
				"id":    2,
				"slug":  "edu_basic",
				"name":  "Edu Basic",
				"price": 0,
				"base_price_note": "Variable + seats",
			},
			{
				"id":    3,
				"slug":  "edu_pro",
				"name":  "Edu Pro",
				"price": 2000,
				"currency": "RUB",
			},
		},
	})
}

func getSubscriptionPlan(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{
		"plan_id": id,
		"details": "Plan details would be fetched from database",
	})
}
