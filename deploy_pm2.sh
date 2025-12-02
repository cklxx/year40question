#!/bin/bash

# Ensure running as root for port 80
if [ "$EUID" -ne 0 ]; then 
  echo "Please run as root (sudo ./deploy_pm2.sh) to bind to port 80"
  exit 1
fi

# Install dependencies
echo "Installing dependencies..."
# Use Tencent Cloud mirror for faster installation
npm config set registry http://mirrors.cloud.tencent.com/npm/
npm install

# Build the application
echo "Building application..."
npm run build

# Install PM2 globally if not installed
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
fi

# Stop existing process if running
echo "Stopping existing process..."
pm2 delete year40question || true

# Start the application on port 80
echo "Starting application on port 80..."
# Start Next.js production server on port 80
pm2 start npm --name "year40question" -- start -- -p 80

# Save PM2 list to resurrect on reboot
pm2 save

# Setup startup hook (this might print a command to run, we try to execute it if possible, but usually requires user interaction on first run)
echo "Setting up PM2 startup hook..."
pm2 startup | grep "sudo" | bash || true

echo "Deployment complete! Application is running on port 80 via PM2."
echo "You can check status with: pm2 status"
echo "View logs with: pm2 logs year40question"
