# Tapayz Documentation Deployment Guide

## 🚀 Quick Start with PM2

### Prerequisites
- Node.js 16+ installed
- Yarn package manager
- PM2 (will be auto-installed if missing)

### 🎯 One-Command Deployment

```bash
# Use yarn start for PM2 deployment
yarn start
```

This will:
1. Build the documentation
2. Start the server with PM2 on port 5000
3. Configure auto-restart and logging

### 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Deploy with PM2 (build + start) |
| `yarn deploy` | Full deployment (build + start) |
| `yarn stop` | Stop the PM2 process |
| `yarn restart` | Restart the PM2 process |
| `yarn delete` | Delete the PM2 process |
| `yarn logs` | View PM2 logs |

### 🛠️ Alternative Startup Methods

#### Windows
```cmd
start-docs.bat
```

#### Linux/Mac
```bash
./start-docs.sh
```

#### Manual PM2 Commands
```bash
# Start with PM2
pm2 start ecosystem.config.js

# Monitor
pm2 status
pm2 logs tapayz-docs

# Manage
pm2 restart tapayz-docs
pm2 stop tapayz-docs
pm2 delete tapayz-docs
```

## 🔧 Configuration

### PM2 Configuration (`ecosystem.config.js`)
- **Port**: 5000
- **Host**: 0.0.0.0 (all interfaces)
- **Environment**: Production
- **Auto-restart**: Enabled
- **Memory limit**: 1GB
- **Logs**: `./logs/` directory

### VitePress Configuration
- **English (default)**: `/` (root path)
- **Korean**: `/ko/`
- **Build output**: `dist/`

## 📊 Monitoring

### View Logs
```bash
# Real-time logs
yarn logs

# Or directly with PM2
pm2 logs tapayz-docs --lines 100
```

### Check Status
```bash
pm2 status
pm2 monit  # Interactive monitoring
```

## 🔄 Updates and Maintenance

### Update Documentation
```bash
# Pull latest changes
git pull

# Rebuild and restart
yarn deploy
```

### Zero-Downtime Updates
```bash
# Build first
yarn build

# Restart (PM2 handles graceful restart)
yarn restart
```

## 🌐 Access URLs

- **Main site**: http://localhost:5000
- **Korean version**: http://localhost:5000/ko/
- **API docs**: http://localhost:5000/api/

## 🔒 Production Considerations

### Firewall
Ensure port 5000 is open for external access:
```bash
# Ubuntu/Debian
sudo ufw allow 5000

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=5000/tcp
sudo firewall-cmd --reload
```

### Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name docs.tapayz.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### PM2 Startup (Auto-start on boot)
```bash
# Generate startup script
pm2 startup

# Save current processes
pm2 save
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000
netstat -tulpn | grep :5000

# Kill process
kill -9 <PID>

# Or use different port in ecosystem.config.js
```

### PM2 Not Starting
```bash
# Check PM2 status
pm2 status

# Restart PM2 daemon
pm2 kill
pm2 resurrect
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules/.cache
yarn build
```

## 📈 Performance Tips

1. **Enable gzip compression** in reverse proxy
2. **Set proper cache headers** for static assets
3. **Use CDN** for global distribution
4. **Monitor memory usage** with `pm2 monit`
5. **Regular log rotation** to prevent disk space issues

---

For additional support, check the [VitePress documentation](https://vitepress.dev/) or [PM2 documentation](https://pm2.keymetrics.io/).