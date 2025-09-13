#!/bin/bash

# Build script for S3 static website deployment
echo "Building application for S3 static hosting..."

# Clean previous build
rm -rf dist/

# Build the application using static config
npx vite build --config vite.config.static.ts

# Copy public directory contents to dist (for data files)
if [ -d "public" ]; then
  echo "Copying public directory contents to dist..."
  cp -r public/* dist/
fi

echo "Build completed! Files are ready in ./dist directory"
echo ""
echo "To deploy to S3:"
echo "1. Upload all files from ./dist to your S3 bucket"
echo "2. Ensure S3 static website hosting is enabled"
echo "3. Set both index and error document to 'index.html'"
echo "4. Make the bucket publicly readable"
echo ""
echo "For CloudFront (recommended):"
echo "1. Create CloudFront distribution with S3 origin"
echo "2. Set custom error pages (403, 404) to return /index.html with 200 status"
echo "3. Enable compression and caching"