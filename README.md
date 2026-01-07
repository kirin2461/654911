<div align="center">

# 🚀 Nemaks

### Modern Discord-like Communication Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-67.4%25-blue)](https://github.com/kirin2461/654911)
[![Go](https://img.shields.io/badge/Go-23.5%25-00ADD8)](https://github.com/kirin2461/654911)
[![Rust](https://img.shields.io/badge/Rust-2.3%25-orange)](https://github.com/kirin2461/654911)

*A self-hosted, full-featured communication platform with real-time messaging, voice/video calls, and moderation tools*

[Features](#-features) • [Installation](#-installation) • [Documentation](#-documentation) • [Roadmap](#-roadmap) • [Contributing](#-contributing)

</div>

---

## 💫 Live Demo

_(Deployment link not available yet)_

---

## 📖 About

**Nemaks** is a comprehensive, Discord-like communication platform designed for teams, communities, and organizations that prioritize server-side moderation and administrative control. Built with modern technologies and microservices architecture, Nemaks provides:

- **Real-time messaging** with WebSocket support
- **Voice and video calls** powered by WebRTC/LiveKit
- **Guild-based communities** with channels and roles
- **Advanced moderation tools** including audit logging and content retention
- **Microservices architecture** with Go backend and Rust services for scalability

### Why Nemaks?

Unlike end-to-end encrypted platforms, Nemaks intentionally enables server-side moderation and administrative access with full audit trails. This makes it ideal for:

- Organizations requiring content oversight and compliance
- Communities needing robust moderation capabilities
- Educational institutions with safety requirements
- Teams requiring conversation archival and search

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
  - [Quick Start (Local)](#quick-start-local)
  - [Docker Deployment](#docker-deployment)
  - [Manual Setup](#manual-setup)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Development](#-development)
- [Testing](#-testing)
- [Roadmap](#-roadmap)
- [Documentation](#-documentation)
- [FAQ](#-faq)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

### Core Functionality

- 💬 **Real-time Messaging**: WebSocket-based instant messaging with typing indicators
- 🎙️ **Voice & Video Calls**: WebRTC/LiveKit integration for high-quality calls
- 🏰 **Guild System**: Create communities with multiple channels and categories
- 👥 **User Management**: Registration, authentication, and profile customization
- 📎 **File Sharing**: Upload and share files within conversations
- 🔔 **Notifications**: Real-time push notifications for mentions and messages

### Advanced Features

- 🛡️ **Role-Based Access Control (RBAC)**: Fine-grained permissions system
- 🔨 **Moderation Tools**: Ban, mute, shadowban, and content management
- 📊 **Audit Logging**: Complete audit trail with 45-day retention
- 🔍 **Search & Export**: Full-text search and conversation export capabilities
- 🤖 **JARVIS Integration**: Voice assistant capabilities
- 🔄 **gRPC Microservices**: Scalable Rust-based audit and search services

### Security & Privacy

- 🔐 **JWT Authentication**: Secure token-based authentication
- 🚫 **Server-Side Moderation**: Content oversight with audit trails
- 🔒 **Role-Based Permissions**: Granular access control per guild
- 📝 **Audit Retention**: 45-day message and action history

---

## 🛠️ Tech Stack

### Backend

- **Go 1.24** - Main API server
- **Gin** - HTTP web framework
- **GORM** - ORM for database operations
- **PostgreSQL 15** - Primary database
- **Redis 7** - Caching and pub/sub
- **WebSocket** (gorilla/websocket) - Real-time communication
- **gRPC** - Service-to-service communication
- **JWT** - Authentication tokens

### Frontend

- **React 18** - UI library
- **TypeScript 5.6** - Type-safe JavaScript
- **Vite 6** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Wouter** - Lightweight routing
- **Zustand** - State management
- **TanStack Query** - Data fetching and caching
- **Socket.IO Client** - Real-time communication
- **Framer Motion** - Animation library
- **React Hook Form + Zod** - Form handling and validation

### Microservices (Rust)

- **Rust** - High-performance microservices
- **Tonic** - gRPC framework
- **Tokio** - Async runtime
- **Audit Service** - Event logging and compliance
- **Search Service** - Full-text search capabilities

### Infrastructure

- **Docker & Docker Compose** - Containerization
- **LiveKit** - Voice/video infrastructure
- **Envoy** - API gateway (optional)
- **Protocol Buffers** - Service contracts

---

## 🚀 Installation

### Prerequisites

- **Go** 1.24+
- **Node.js** 18+ and npm/yarn
- **PostgreSQL** 15+
- **Redis** 7+
- **Docker** (optional, for containerized deployment)
- **Rust** (optional, for building microservices)

### Quick Start (Local)

1. **Clone the repository**

```bash
git clone https://github.com/kirin2461/654911.git
cd 654911
```

2. **Configure environment**

```bash
cp .env.example .env
# Edit .env with your configuration
```

Required variables:
```env
DATABASE_URL=postgres://nemaks_user:nemaks_password@localhost:5432/nemaks
REDIS_URL=redis://localhost:6379
LIVEKIT_URL=ws://localhost:7880
LIVEKIT_API_KEY=devkey
LIVEKIT_API_SECRET=secret
```

3. **Start services**

**On Linux/macOS:**
```bash
chmod +x start.sh
./start.sh
```

**On Windows:**
```bash
start.bat
```

**Or use quick-start script:**
```bash
# Windows
quick-start.bat

# Linux/macOS
chmod +x start.sh && ./start.sh
```

4. **Install and run frontend**

```bash
cd frontend
npm install
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8080` (or as configured)

### Docker Deployment

For a complete containerized setup:

```bash
docker-compose up -d
```

This will start:
- PostgreSQL database (port 5432)
- Redis cache (port 6379)
- Rust audit service (port 50051)
- Rust search service (port 50052)

To include the Go backend in Docker:

```bash
# Uncomment the backend service in docker-compose.yml
docker-compose up -d
```

### Manual Setup

#### Backend

```bash
cd backend
go mod download
go build -o nemaks-server
./nemaks-server
```

#### Frontend

```bash
cd frontend
npm install
npm run build
npm run preview
```

#### Rust Services (Optional)

```bash
cd rust-services
cargo build --release

# Run audit service
cd audit-service
cargo run --release

# Run search service (in another terminal)
cd search-service
cargo run --release
```

---

## 📁 Project Structure

```
654911/
├── backend/                 # Go backend server
│   ├── cmd/                # Entry points
│   ├── internal/           # Private application code
│   │   ├── api/           # HTTP handlers
│   │   ├── auth/          # Authentication logic
│   │   ├── db/            # Database models
│   │   ├── middleware/    # HTTP middleware
│   │   └── websocket/     # WebSocket handlers
│   ├── pkg/               # Public libraries
│   └── go.mod
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── stores/        # Zustand state stores
│   │   ├── lib/           # Utilities
│   │   └── App.tsx        # Main app component
│   ├── public/            # Static assets
│   └── package.json
│
├── rust-services/          # Rust microservices workspace
│   ├── audit-service/     # Audit logging service
│   ├── search-service/    # Full-text search service
│   └── Cargo.toml         # Workspace manifest
│
├── proto/                  # Protocol Buffer definitions
│   ├── audit.proto        # Audit service contract
│   └── search.proto       # Search service contract
│
├── jarvis/                 # JARVIS voice assistant
├── jsvoice/                # Voice processing
├── docs/                   # Additional documentation
├── attached_assets/        # Static resources
│
├── docker-compose.yml      # Docker orchestration
├── envoy.yaml             # Envoy proxy config
├── livekit.yaml           # LiveKit configuration
├── Makefile               # Build automation
├── .env.example           # Environment template
└── README.md              # This file
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

| Variable | Description | Default |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://nemaks_user:nemaks_password@localhost:5432/nemaks` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `LIVEKIT_URL` | LiveKit server URL | `ws://localhost:7880` |
| `LIVEKIT_API_KEY` | LiveKit API key | `devkey` |
| `LIVEKIT_API_SECRET` | LiveKit API secret | `secret` |
| `AUDIT_SERVICE_URL` | Audit service gRPC endpoint | `localhost:50051` |
| `SEARCH_SERVICE_URL` | Search service gRPC endpoint | `localhost:50052` |
| `ENABLE_RUST_SERVICES` | Enable Rust microservices | `true` |

### LiveKit Configuration

Edit `livekit.yaml` for WebRTC settings:

```yaml
port: 7880
rtc:
  port_range_start: 50000
  port_range_end: 60000
```

---

## 💻 Development

### Frontend Development

```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Backend Development

```bash
cd backend
go run cmd/server/main.go  # Run development server
go test ./...              # Run tests
go build                   # Build binary
```

### Code Style

- **Frontend**: ESLint + TypeScript strict mode
- **Backend**: Go fmt + Go vet
- **Rust**: Cargo fmt + Cargo clippy

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
go test ./... -v
go test -cover ./...
```

### Frontend Tests

```bash
cd frontend
npm run test
```

### Validation Scripts

```bash
# Windows
validate.bat

# Linux/macOS
chmod +x validate.sh
./validate.sh
```

---

## 🗺️ Roadmap

### ✅ Phase A - Repository Quality (Completed)
- Documentation and contributing guidelines
- CI/CD checks
- Security policies

### 🔄 Phase B - RBAC & Moderation (In Progress)
- Discord-like roles and permissions
- Guild-scoped moderators
- Global admin/super-admin roles
- Ban/mute/shadowban functionality
- DM access approval flow
- Audit logging with 45-day retention
- Search and export capabilities

### 📋 Phase C - Rust Services Integration
- Complete Rust service end-to-end (DB + cache + gRPC + Go client)
- Performance optimization
- Service mesh integration

### 📞 Phase D - Enhanced Calls
- Support for 3+ participant conferences
- Screen sharing
- Call recording
- Call history and analytics

### 🤝 Phase E - Collaboration Features
- CRDT integration for collaborative editing
- Offline mode with sync
- Document snapshots
- Real-time co-editing

See [ROADMAP.md](./ROADMAP.md) for detailed timeline.

---

## 📚 Documentation

Additional documentation available:

- [**CONTRIBUTING.md**](./CONTRIBUTING.md) - Contribution guidelines and workflow
- [**SECURITY.md**](./SECURITY.md) - Security policies and vulnerability reporting
- [**GRPC_SETUP.md**](./GRPC_SETUP.md) - gRPC service setup and integration
- [**AI_INTEGRATION_GUIDE.md**](./AI_INTEGRATION_GUIDE.md) - AI features integration
- [**JARVIS_INTEGRATION_SETUP.md**](./JARVIS_INTEGRATION_SETUP.md) - JARVIS assistant setup
- [**JARVIS_COMMAND_CONTRACT.md**](./JARVIS_COMMAND_CONTRACT.md) - Voice command specification
- [**JARVIS_TESTING_GUIDE.md**](./JARVIS_TESTING_GUIDE.md) - Testing voice features
- [**REDIS_LIVEKIT_SETUP.md**](./REDIS_LIVEKIT_SETUP.md) - Real-time infrastructure setup
- [**PHASE5_FINAL_INTEGRATION.md**](./PHASE5_FINAL_INTEGRATION.md) - Final integration guide

---

## ❓ FAQ

### Why no end-to-end encryption?

Nemaks intentionally does not implement E2E encryption to enable:
- Server-side content moderation
- Administrative oversight with audit trails
- Compliance with organizational policies
- Full-text search across all content
- Message retention and archival

This makes it suitable for organizations requiring content oversight rather than privacy-first messaging.

### Can I deploy Nemaks for production?

Yes, but please:
- Review [SECURITY.md](./SECURITY.md) for security best practices
- Configure proper database backups
- Set up SSL/TLS certificates
- Use strong authentication credentials
- Enable appropriate monitoring and logging

### How do I enable Rust microservices?

Set `ENABLE_RUST_SERVICES=true` in your `.env` file and ensure the services are running:

```bash
cd rust-services
cargo build --release
# Then run each service separately or via Docker
```

### What's the difference between this and Discord?

Nemaks is:
- **Open-source** - Full control over your data and deployment
- **Self-hosted** - Run on your own infrastructure
- **Moderation-first** - Built for organizations requiring oversight
- **Customizable** - Modify and extend to your needs
- **Microservices-ready** - Scale individual components independently

### Can I contribute?

Absolutely! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines. We welcome:
- Bug reports and fixes
- Feature implementations
- Documentation improvements
- Performance optimizations
- UI/UX enhancements

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details on:

- Code of conduct
- Development workflow
- Coding standards
- Pull request process
- Issue reporting

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

```
MIT License

Copyright (c) 2026 kirin2461

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

See [LICENSE](./LICENSE) file for full details.

---

## 👤 Author

**kirin2461**

- GitHub: [@kirin2461](https://github.com/kirin2461)
- Repository: [github.com/kirin2461/654911](https://github.com/kirin2461/654911)

---

## 🌟 Acknowledgments

- Built with inspiration from Discord's communication model
- Powered by amazing open-source technologies
- Thanks to all contributors and the community

---

## 📞 Support

For questions, issues, or discussions:

- 🐛 [Report bugs](https://github.com/kirin2461/654911/issues)
- 💡 [Request features](https://github.com/kirin2461/654911/issues)
- 💬 [Start discussions](https://github.com/kirin2461/654911/discussions)

---

<div align="center">

**⭐ If you find this project useful, please consider giving it a star! ⭐**

[⬆ Back to Top](#-nemaks)

</div>