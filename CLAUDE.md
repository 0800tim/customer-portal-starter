# AIVA Customer Portal - AI Development Context

This file provides context for AI coding assistants (Claude Code, Cursor, Windsurf, etc.) to understand and work with this codebase.

## Project Overview

This is a **customer-facing subscription portal** built with Next.js 14 and AIVA integration. It allows subscription customers to:

- View and manage their subscriptions
- Update delivery schedules
- Pause/resume/skip orders
- Manage their profile and preferences
- View order history
- Access loyalty rewards

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Data**: AIVA MCP Server (subscription data, customer intelligence)
- **Auth**: Magic link authentication
- **PWA**: Service worker, offline support, push notifications

## Directory Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (auth)/               # Auth routes (login, magic-link)
│   ├── (portal)/             # Protected portal routes
│   │   ├── dashboard/        # Main dashboard
│   │   ├── subscriptions/    # Subscription management
│   │   ├── orders/           # Order history
│   │   ├── profile/          # User profile
│   │   └── rewards/          # Loyalty/rewards
│   ├── api/                  # API routes
│   └── layout.tsx            # Root layout
├── components/
│   ├── ui/                   # Base UI components
│   ├── subscription/         # Subscription-specific components
│   └── profile/              # Profile components
├── lib/
│   ├── aiva.ts               # AIVA API client
│   ├── auth.ts               # Auth utilities
│   └── utils.ts              # General utilities
└── hooks/                    # Custom React hooks
```

## Key Patterns

### AIVA Data Fetching

Use the AIVA client for all data operations:

```typescript
import { aiva } from '@/lib/aiva';

// Server component
async function SubscriptionList() {
  const subscriptions = await aiva.subscriptions.list();
  return <SubscriptionGrid items={subscriptions} />;
}

// Client component with SWR
function useSubscriptions() {
  return useSWR('/api/subscriptions', fetcher);
}
```

### Authentication Flow

Magic link authentication:
1. User enters email
2. Server sends magic link via AIVA
3. User clicks link, gets JWT token
4. Token stored in httpOnly cookie

### Component Conventions

- Use server components by default
- Client components only when needed (interactivity, hooks)
- Prefix client components with `'use client'`
- Keep components small and focused

### Styling

- Use Tailwind utility classes
- Custom brand colors in `tailwind.config.js`
- Dark mode support via `dark:` prefix
- Responsive design: mobile-first

## Common Tasks

### Add a New Dashboard Widget

1. Create component in `src/components/dashboard/`
2. Fetch data using AIVA client
3. Add to dashboard layout

### Customize for Vertical

To customize for a specific vertical (pet food, coffee, etc.):

1. Update `src/config/vertical.ts` with vertical-specific fields
2. Add profile fields to `src/components/profile/`
3. Update subscription display components
4. Modify dashboard widgets

### Add Push Notification

1. Register for push in `src/lib/push.ts`
2. Store subscription via AIVA API
3. Send notifications through AIVA

## Environment Variables

Required in `.env.local`:
- `AIVA_API_KEY` - Your AIVA API key
- `NEXT_PUBLIC_APP_URL` - App URL for auth callbacks
- `JWT_SECRET` - Secret for signing tokens

Optional:
- `SHOPIFY_STORE` - Direct Shopify access
- `SHOPIFY_ACCESS_TOKEN` - Shopify Admin token

## MCP Integration

The `mcp.json` file configures AIVA MCP for AI tools. The AIVA MCP provides:

- Customer data and profiles
- Subscription management
- Order history
- Loyalty/rewards data
- Shopify store data (proxied)

## Testing

```bash
npm run test        # Unit tests
npm run test:e2e    # E2E tests
npm run lint        # Linting
```

## Deployment

Optimized for Vercel deployment:
```bash
vercel
```

Or any Node.js host with `npm run build && npm start`.

## Prompts for Customization

Use these prompts to customize the portal:

**Brand Customization:**
"Update the color scheme to use [brand colors]. Update the logo and favicon. Apply consistent styling across all components."

**Add Profile Fields:**
"Add [field names] to the customer profile. Include validation, display in profile page, and sync with AIVA API."

**Custom Dashboard:**
"Add a widget to the dashboard that shows [metric/data]. Fetch from AIVA and display with appropriate visualization."

**Notification Setup:**
"Implement push notifications for [event type]. Request permission, register subscription, and handle notification display."
