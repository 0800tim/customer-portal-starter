# Getting Started

This guide will help you set up and run the customer portal.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- AIVA API key ([get one here](https://aiva.dev/dashboard))

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/0800tim/customer-portal-starter.git my-portal
cd my-portal
```

Or use the CLI:

```bash
npx create-aiva-app my-portal --template customer-portal
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```bash
AIVA_API_KEY=your-api-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=your-secret-here  # Generate with: openssl rand -hex 32
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your portal.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   │   └── login/         # Magic link login
│   ├── (portal)/          # Protected portal pages
│   │   ├── dashboard/     # Main dashboard
│   │   ├── subscriptions/ # Subscription management
│   │   ├── orders/        # Order history
│   │   ├── profile/       # User profile
│   │   └── rewards/       # Loyalty rewards
│   └── api/               # API routes
├── components/
│   ├── subscription/      # Subscription components
│   └── ui/                # UI components
└── lib/
    ├── aiva.ts            # AIVA API client
    ├── auth.ts            # Authentication utilities
    └── utils.ts           # Helper functions
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## Next Steps

- [Customization](./customization.md) - Brand and customize the portal
- [Authentication](./authentication.md) - Configure auth flow
- [Deployment](./deployment.md) - Deploy to production
- [AI Development](./ai-development.md) - Use with AI tools
