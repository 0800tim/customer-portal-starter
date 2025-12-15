# Deployment

Deploy your customer portal to production.

## Vercel (Recommended)

### Quick Deploy

```bash
vercel
```

### Step-by-Step

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables**

   In Vercel Dashboard > Project Settings > Environment Variables:
   - `AIVA_API_KEY`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_APP_URL` (your production URL)

5. **Configure Custom Domain** (optional)

   In Vercel Dashboard > Project Settings > Domains

## Other Platforms

### Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment Variables**

   In Netlify Dashboard > Site Settings > Environment Variables

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Railway

1. **Connect Repository**

   Link your GitHub repository in Railway dashboard.

2. **Environment Variables**

   Add in Railway dashboard > Variables

3. **Deploy**

   Railway auto-deploys on push to main.

### Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t customer-portal .
docker run -p 3000:3000 \
  -e AIVA_API_KEY=your-key \
  -e JWT_SECRET=your-secret \
  -e NEXT_PUBLIC_APP_URL=https://yourdomain.com \
  customer-portal
```

### AWS Amplify

1. **Connect Repository**

   In AWS Amplify Console > New App > Host Web App

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Environment Variables**

   In Amplify Console > App Settings > Environment Variables

## Production Checklist

### Security

- [ ] HTTPS configured
- [ ] Environment variables set (not in code)
- [ ] JWT_SECRET is strong and unique
- [ ] CORS configured properly
- [ ] Rate limiting enabled

### Performance

- [ ] Images optimized
- [ ] Caching configured
- [ ] CDN enabled
- [ ] Compression enabled

### Monitoring

- [ ] Error tracking (Sentry, etc.)
- [ ] Analytics configured
- [ ] Uptime monitoring
- [ ] Log aggregation

### SEO

- [ ] Meta tags configured
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] Open Graph tags set

## Environment Variables

| Variable | Production Value |
|----------|-----------------|
| `NODE_ENV` | `production` |
| `AIVA_API_KEY` | Your production API key |
| `JWT_SECRET` | Strong random string |
| `NEXT_PUBLIC_APP_URL` | `https://yourdomain.com` |

## Custom Domain Setup

### DNS Configuration

Add these records to your domain:

**For Vercel:**
- `A` record: `76.76.21.21`
- `CNAME` record: `cname.vercel-dns.com`

**For Netlify:**
- `A` record: `75.2.60.5`
- `CNAME` record: `your-site.netlify.app`

### SSL Certificate

Most platforms provide automatic SSL. Ensure:
- Certificate is valid
- Auto-renewal is enabled
- HSTS is configured

## Rollback

### Vercel

```bash
vercel rollback
```

Or in dashboard: Deployments > Select previous > Promote

### Other Platforms

Keep previous builds and maintain ability to quickly redeploy:

```bash
# Tag releases
git tag v1.0.0
git push origin v1.0.0

# Rollback to tag
git checkout v1.0.0
npm run build
# Deploy
```

## Scaling

The portal is stateless and scales horizontally. Consider:

- **CDN**: CloudFlare, Fastly for static assets
- **Edge Functions**: For geographically distributed auth
- **Database**: If adding persistent storage, use connection pooling
- **Caching**: Redis for session storage at scale
