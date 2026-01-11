#!/bin/bash

echo "🔧 Setting up Go dependencies..."
cd "$(dirname "$0")/.."

# Download dependencies
echo "📦 Downloading dependencies..."
go mod download

# Tidy up go.mod and go.sum
echo "🧹 Running go mod tidy..."
go mod tidy

echo "✅ Dependencies setup complete!"
