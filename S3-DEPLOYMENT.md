# S3 Static Website Deployment Guide

This guide will help you deploy the cybersecurity portfolio application to Amazon S3 as a static website.

## Prerequisites

- AWS account with S3 access
- AWS CLI configured (optional, but recommended)
- Domain name (optional, for custom domain)

## Step 1: Build the Application

Run the build script to create the production-ready static files:

```bash
./build-for-s3.sh
```

This will create a `dist` directory with all the necessary files optimized for static hosting.

## Step 2: Create S3 Bucket

1. **Create a new S3 bucket**:
   - Bucket name: Choose a unique name (e.g., `your-portfolio-website`)
   - Region: Choose the region closest to your target audience
   - **Important**: Uncheck "Block all public access" since this will be a public website

2. **Configure bucket for static website hosting**:
   - Go to Properties tab
   - Scroll down to "Static website hosting"
   - Enable static website hosting
   - Set **Index document**: `index.html`
   - Set **Error document**: `index.html` (crucial for SPA routing)

## Step 3: Upload Files

Upload all files from the `dist` directory to your S3 bucket:

### Using AWS Console:
1. Go to your bucket in the S3 console
2. Click "Upload"
3. Select all files and folders from the `dist` directory
4. Upload with default settings

### Using AWS CLI:
```bash
aws s3 sync ./dist s3://your-bucket-name --delete
```

## Step 4: Set Bucket Policy

Add this bucket policy to make your website publicly readable:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

Replace `your-bucket-name` with your actual bucket name.

## Step 5: Test Your Website

1. Go to the Properties tab of your bucket
2. Scroll to "Static website hosting"
3. Click on the "Bucket website endpoint" URL
4. Your portfolio should now be live!

## Optional: CloudFront Distribution (Recommended)

For better performance and HTTPS support:

1. **Create CloudFront Distribution**:
   - Origin Domain: Your S3 bucket website endpoint
   - Viewer Protocol Policy: Redirect HTTP to HTTPS
   - Compress Objects Automatically: Yes

2. **Configure Custom Error Pages**:
   - 403 error → Return `/index.html` with 200 status
   - 404 error → Return `/index.html` with 200 status
   
   This ensures client-side routing works correctly.

3. **Enable Caching**:
   - Cache TTL: Set appropriate values for your use case
   - Invalidate cache when deploying updates: `/*`

## Optional: Custom Domain

1. **Purchase/Configure Domain**:
   - Use Route 53 or your domain registrar
   
2. **SSL Certificate**:
   - Request certificate in AWS Certificate Manager
   - Validate domain ownership

3. **Update CloudFront**:
   - Add your custom domain as an alternate domain name (CNAME)
   - Select your SSL certificate

4. **DNS Configuration**:
   - Point your domain to the CloudFront distribution

## Updating Your Website

To update your website:

1. Make changes to your code
2. Run `./build-for-s3.sh` to rebuild
3. Upload new files to S3:
   ```bash
   aws s3 sync ./dist s3://your-bucket-name --delete
   ```
4. If using CloudFront, create an invalidation:
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
   ```

## Troubleshooting

### 404 Errors on Page Refresh
- Ensure error document is set to `index.html` in S3 static website hosting
- For CloudFront, configure custom error pages as described above

### Assets Not Loading
- Check that all files uploaded correctly
- Verify bucket policy allows public read access
- Check browser developer tools for specific error messages

### Performance Issues
- Use CloudFront for global content delivery
- Enable gzip compression
- Optimize images and assets

## Cost Considerations

- S3 storage costs are minimal for static websites
- Data transfer costs apply for traffic
- CloudFront can reduce costs for high-traffic sites
- Consider AWS Free Tier limits for new accounts

## Security Notes

- This setup makes your website publicly accessible
- Don't include sensitive information in your code
- Use environment variables for any API keys (though this static version doesn't need them)
- Consider enabling CloudFront security headers

## Support

For issues with this deployment:
1. Check AWS CloudTrail for deployment errors
2. Review S3 access logs
3. Test locally with `npx serve dist` to verify the build works

---

*This portfolio showcases cybersecurity expertise and is optimized for performance and accessibility.*