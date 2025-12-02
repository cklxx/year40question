#!/bin/bash

# Build the Docker image
echo "Building Docker image..."
docker build -t year40question .

# Stop and remove existing container if it exists
echo "Stopping existing container..."
docker stop year40question || true
docker rm year40question || true

# Run the new container on port 80
echo "Starting new container on port 80..."
docker run -d \
  --name year40question \
  --restart always \
  -p 80:3000 \
  year40question

echo "Deployment complete! Application is running on port 80."
