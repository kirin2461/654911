# Subscription Pricing API Endpoints

## Overview

This document provides comprehensive documentation for the subscription pricing management API endpoints. These endpoints allow administrators to manage subscription plans, pricing tiers, and associated billing features.

## Base URL

```
GET/POST/PUT/DELETE /api/admin/pricing
```

## Authentication

All endpoints require Bearer token authentication. Include the token in the Authorization header:

```
Authorization: Bearer YOUR_TOKEN_HERE
```

## Endpoints

### 1. List All Subscription Plans

**Endpoint:** `GET /api/admin/pricing/plans`

**Description:** Returns all active subscription plans.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Starter Plan",
    "description": "Basic features for individuals",
    "price": 9.99,
    "billing_cycle": "monthly",
    "features": "Basic chat,1GB storage",
    "status": "active",
    "created_at": "2026-01-01T00:00:00Z",
    "updated_at": "2026-01-01T00:00:00Z"
  }
]
```

**Status Codes:**
- `200 OK` - Successfully retrieved plans
- `500 Internal Server Error` - Database query failed

---

### 2. Get Single Subscription Plan

**Endpoint:** `GET /api/admin/pricing/plans/:id`

**Description:** Returns a specific subscription plan by ID.

**Parameters:**
- `id` (path, required) - Plan ID

**Response:**
```json
{
  "id": 1,
  "name": "Starter Plan",
  "description": "Basic features",
  "price": 9.99,
  "billing_cycle": "monthly",
  "features": "Basic chat,1GB storage",
  "status": "active"
}
```

**Status Codes:**
- `200 OK` - Successfully retrieved plan
- `404 Not Found` - Plan does not exist

---

### 3. Create New Subscription Plan

**Endpoint:** `POST /api/admin/pricing/plans`

**Description:** Creates a new subscription plan.

**Request Body:**
```json
{
  "name": "Professional Plan",
  "description": "Advanced features for teams",
  "price": 29.99,
  "billing_cycle": "monthly",
  "features": "Advanced chat,100GB storage,Priority support"
}
```

**Validation Rules:**
- `name` (required, string) - Plan name
- `description` (optional, string) - Plan description
- `price` (required, float) - Price must be > 0
- `billing_cycle` (required, string) - "monthly", "yearly", or "weekly"
- `features` (optional, string) - Comma-separated features list

**Response:**
```json
{
  "id": 2,
  "name": "Professional Plan",
  "description": "Advanced features for teams",
  "price": 29.99,
  "billing_cycle": "monthly",
  "features": "Advanced chat,100GB storage,Priority support",
  "status": "active",
  "created_at": "2026-01-09T12:00:00Z"
}
```

**Status Codes:**
- `201 Created` - Plan successfully created
- `400 Bad Request` - Validation error
- `500 Internal Server Error` - Database error

---

### 4. Update Subscription Plan

**Endpoint:** `PUT /api/admin/pricing/plans/:id`

**Description:** Updates an existing subscription plan.

**Parameters:**
- `id` (path, required) - Plan ID

**Request Body:**
```json
{
  "name": "Professional Plan Updated",
  "price": 34.99,
  "status": "active"
}
```

**Note:** Only provide fields you want to update.

**Response:**
```json
{
  "id": 2,
  "name": "Professional Plan Updated",
  "price": 34.99,
  "status": "active",
  "updated_at": "2026-01-09T13:00:00Z"
}
```

**Status Codes:**
- `200 OK` - Plan successfully updated
- `400 Bad Request` - Validation error
- `500 Internal Server Error` - Database error

---

### 5. Delete Subscription Plan

**Endpoint:** `DELETE /api/admin/pricing/plans/:id`

**Description:** Soft deletes a subscription plan (sets status to inactive).

**Parameters:**
- `id` (path, required) - Plan ID

**Response:**
```json
{
  "message": "Plan deleted successfully"
}
```

**Status Codes:**
- `200 OK` - Plan successfully deleted
- `500 Internal Server Error` - Database error

---

### 6. Get Pricing Metrics

**Endpoint:** `GET /api/admin/pricing/metrics`

**Description:** Returns pricing analytics and statistics.

**Response:**
```json
{
  "total_plans": 5,
  "active_plans": 4,
  "average_price": 24.99,
  "total_subscribers": 1250
}
```

**Status Codes:**
- `200 OK` - Metrics retrieved successfully
- `500 Internal Server Error` - Query failed

---

## Error Handling

All endpoints follow standard HTTP status codes and return errors in JSON format:

```json
{
  "error": "Description of the error"
}
```

## Rate Limiting

API requests are rate-limited to 100 requests per minute per authenticated user.

## Examples

### cURL Example: Get All Plans

```bash
curl -X GET 'http://localhost:8080/api/admin/pricing/plans' \
  -H 'Authorization: Bearer your_token_here' \
  -H 'Content-Type: application/json'
```

### cURL Example: Create Plan

```bash
curl -X POST 'http://localhost:8080/api/admin/pricing/plans' \
  -H 'Authorization: Bearer your_token_here' \
  -H 'Content-Type: application/json' \
  -d '{"name":"Enterprise","price":99.99,"billing_cycle":"monthly"}'
```

## Integration Notes

- All timestamps are in UTC (ISO 8601 format)
- Prices are in USD by default
- Billing cycles support: "monthly", "yearly", "weekly"
- Status values: "active", "inactive", "archived"
- Features are stored as comma-separated values

## See Also

- [Admin Panel Documentation](AdminPricingPanel.md)
- [Manual Transfer Service](../backend/internal/billing/manual_transfer_service.go)
- [Pricing Handler Source](../backend/internal/billing/pricing_handler.go)
