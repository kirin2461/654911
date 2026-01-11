# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously at Nemaxks. If you discover a security vulnerability, please follow these steps:

### 1. Do Not Disclose Publicly

Please **do not** create a public GitHub issue for security vulnerabilities. This could put users at risk.

### 2. Contact Us Privately

Send a detailed report to:
- **Email**: security@nemaxks.com (or create a private security advisory on GitHub)
- **GitHub Security Advisory**: [Create a private advisory](https://github.com/kirin2461/Nemaxks/security/advisories/new)

### 3. Include in Your Report

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if you have one)
- Your contact information for follow-up

### 4. Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity (critical: 24-72 hours, high: 1-2 weeks)

## Security Measures

### Authentication & Authorization

- JWT-based authentication with secure secret keys
- Password hashing using bcrypt
- Role-based access control (RBAC)
- Session management with token expiration

### Data Protection

- Sensitive data (passwords, API keys) excluded from API responses
- Environment variables for secrets (never hardcoded)
- HTTPS enforcement in production
- CORS properly configured for production

### Input Validation

- Request validation using Gin binding
- SQL injection prevention via parameterized queries (GORM)
- Content filtering for forbidden words
- File upload validation and size limits

### Infrastructure

- Graceful shutdown handling
- Rate limiting recommendations
- Audit logging for admin actions
- IP ban capabilities

## Security Checklist for Deployment

- [ ] Set strong `JWT_SECRET` (use `openssl rand -hex 32`)
- [ ] Configure `FRONTEND_URL` for CORS
- [ ] Enable HTTPS
- [ ] Set `GIN_MODE=release`
- [ ] Review and restrict file upload settings
- [ ] Configure proper database credentials
- [ ] Set up firewall rules
- [ ] Enable audit logging
- [ ] Regular dependency updates

## Known Security Considerations

1. **WebSocket Connections**: Ensure proper authentication for WebSocket endpoints
2. **File Uploads**: Validate file types and scan for malware
3. **AI Integration**: API keys should be user-specific and encrypted
4. **Rate Limiting**: Implement rate limiting for all public endpoints

## Bug Bounty

We currently do not have a formal bug bounty program, but we greatly appreciate responsible disclosure and will acknowledge security researchers in our changelog.

## Updates

This security policy may be updated periodically. Check back for the latest version.

Last updated: January 2026
