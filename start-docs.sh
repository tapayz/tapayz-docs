#!/bin/bash

# Tapayz Documentation Server Startup Script
# Usage: ./start-docs.sh

set -e

echo "🚀 Starting Tapayz Documentation Server..."

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "❌ PM2 is not installed. Installing PM2..."
    npm install -g pm2
fi

# Create logs directory if it doesn't exist
mkdir -p logs

# Build the documentation
echo "📦 Building documentation..."
yarn build

# Stop any existing instance
echo "🛑 Stopping existing instances..."
pm2 delete tapayz-docs 2>/dev/null || true

# Start the application with PM2
echo "▶️  Starting with PM2..."
pm2 start ecosystem.config.js

# Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# Show status
echo "📊 Application Status:"
pm2 status

echo ""
echo "✅ Tapayz Documentation Server is now running!"
echo "🌐 Access URL: http://localhost:5000"
echo ""
echo "📝 Useful commands:"
echo "  yarn logs     - View logs"
echo "  yarn restart  - Restart server"
echo "  yarn stop     - Stop server"
echo "  yarn delete   - Delete PM2 process"
echo ""