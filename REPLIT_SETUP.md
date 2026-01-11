# 🚀 Replit Deployment Guide

## Quick Start

### 1. Import to Replit
1. Go to [Replit](https://replit.com)
2. Click "Create Repl"
3. Select "Import from GitHub"
4. Paste: `https://github.com/kirin2461/Nemaxks`

### 2. Setup Dependencies

**Backend (Go)**
```bash
cd backend
chmod +x scripts/setup-deps.sh
./scripts/setup-deps.sh
```

**Frontend (React)**
```bash
cd frontend
npm install
```

### 3. Environment Variables

Create `.env` files:

**backend/.env**
```env
PORT=8080
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret_key
REDIS_URL=your_redis_url
```

**frontend/.env**
```env
VITE_API_URL=https://your-repl.replit.app/api
VITE_WS_URL=wss://your-repl.replit.app/ws
```

### 4. Run the Application

Replit will automatically:
1. Build backend: `go build -o server cmd/server/main.go`
2. Build frontend: `npm run build`
3. Start both services

### 5. Access Your App

- **Frontend**: `https://your-repl.replit.app`
- **Backend API**: `https://your-repl.replit.app/api`
- **WebSocket**: `wss://your-repl.replit.app/ws`

## Troubleshooting

### Backend errors
```bash
cd backend
go mod tidy
go run cmd/server/main.go
```

### Frontend errors
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Database connection
Use Replit's PostgreSQL addon or external service like:
- [Neon](https://neon.tech)
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)

## Features Enabled

✅ Real-time messaging (WebSocket)
✅ Voice & Video calls (WebRTC)
✅ File uploads
✅ Screen sharing
✅ User authentication
✅ Redis caching
✅ PostgreSQL database

## Production Checklist

- [ ] Set strong JWT_SECRET
- [ ] Enable HTTPS only
- [ ] Configure CORS properly
- [ ] Set up database backups
- [ ] Monitor logs
- [ ] Rate limiting enabled

## Support

If you encounter issues:
1. Check Replit console logs
2. Verify environment variables
3. Run dependency setup scripts
4. Open an issue on GitHub
