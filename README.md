# AIVA Customer Portal Starter

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Production-ready customer portal for subscription businesses. Built with Next.js 14 and AIVA integration.

## Features

- **Subscription Management** - View, pause, resume, skip, swap products
- **Order History** - Complete order and delivery tracking
- **Customer Profile** - Customizable profile with vertical-specific fields
- **PWA Ready** - Installable, offline support, push notifications
- **Magic Link Auth** - Passwordless authentication
- **AIVA Integration** - Pre-wired MCP for AI development

## Quick Start

### Option 1: Using create-aiva-app (Recommended)

```bash
npx create-aiva-app my-portal --template customer-portal
cd my-portal
cp .env.example .env.local
# Add your AIVA_API_KEY
npm run dev
```

### Option 2: Clone this repo

```bash
git clone https://github.com/0800tim/customer-portal-starter.git my-portal
cd my-portal
npm install
cp .env.example .env.local
# Add your AIVA_API_KEY
npm run dev
```

## Configuration

### Environment Variables

Create `.env.local` with:

```bash
# Required
AIVA_API_KEY=your-api-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=your-jwt-secret-here

# Optional - Direct Shopify access
SHOPIFY_STORE=mystore.myshopify.com
SHOPIFY_ACCESS_TOKEN=shpat_xxxxx
```

### MCP Configuration

For AI development, configure your tool:

**Cursor** (`.cursor/mcp.json`):
```json
{
  "mcpServers": {
    "aiva": {
      "command": "npx",
      "args": ["@getaiva/mcp"],
      "env": {
        "AIVA_API_KEY": "${AIVA_API_KEY}"
      }
    }
  }
}
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/               # Login, magic-link callback
│   ├── (portal)/             # Protected routes
│   │   ├── dashboard/        # Main dashboard
│   │   ├── subscriptions/    # Subscription management
│   │   ├── orders/           # Order history
│   │   ├── profile/          # User profile
│   │   └── rewards/          # Loyalty rewards
│   └── api/                  # API routes
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── subscription/         # Subscription widgets
│   └── profile/              # Profile components
├── lib/
│   ├── aiva.ts               # AIVA API client
│   ├── auth.ts               # Auth utilities
│   └── utils.ts              # Helpers
└── hooks/                    # Custom hooks
```

## Customization

### Branding

Edit `tailwind.config.js` to customize colors:

```js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-brand-color',
        // ...
      }
    }
  }
}
```

### Vertical Customization

For pet food, coffee, wine, or other verticals:

1. Edit `src/config/vertical.ts`:
   ```typescript
   export const VERTICAL = {
     name: 'Pet Food',
     profileFields: ['petName', 'breed', 'dietaryRestrictions'],
     // ...
   };
   ```

2. Add profile components in `src/components/profile/`

3. Update dashboard widgets as needed

### AI-Assisted Customization

Open in Cursor or Claude Code and use prompts like:

- "Make this a pet food subscription portal with pet profiles"
- "Add a coffee roast preference selector to the profile"
- "Create a wine cellar tracking feature"

See `CLAUDE.md` for detailed AI development context.

## Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run linter
npm run test     # Run tests
```

## Deployment

### Vercel (Recommended)

```bash
vercel
```

### Other Platforms

Works with any Node.js host:
- Netlify
- Railway
- Render
- AWS Amplify

## Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start development server |
| `build` | Build for production |
| `start` | Start production server |
| `lint` | Run ESLint |
| `test` | Run Jest tests |

## Related

- [@getaiva/mcp](https://github.com/0800tim/aiva-mcp) - AIVA MCP server
- [create-aiva-app](https://github.com/0800tim/create-aiva-app) - CLI scaffolding
- [AppSpurt Prompts](https://appspurt.com/prompts) - AI prompt library

## License

MIT
