# Customization

Customize the customer portal to match your brand and business needs.

## Branding

### Colors

Update `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',   // Lightest
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',  // Default
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',  // Darkest
        },
      },
    },
  },
};
```

Generate a color palette at [Tailwind Color Generator](https://uicolors.app/create).

### Logo

Replace these files:
- `public/logo.svg` - Main logo
- `public/favicon.ico` - Browser favicon
- `public/apple-touch-icon.png` - iOS home screen icon

### Typography

Add custom fonts in `src/app/layout.tsx`:

```typescript
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
```

## Vertical Customization

### Configure Your Vertical

Edit or create `src/config/vertical.ts`:

```typescript
export const VERTICAL = {
  name: 'Pet Food',

  // Custom profile fields
  profileFields: [
    { key: 'petName', label: 'Pet Name', type: 'text' },
    { key: 'breed', label: 'Breed', type: 'text' },
    { key: 'weight', label: 'Weight (lbs)', type: 'number' },
    { key: 'birthday', label: 'Birthday', type: 'date' },
    {
      key: 'dietaryRestrictions',
      label: 'Dietary Restrictions',
      type: 'multiselect',
      options: ['Grain-free', 'Limited Ingredient', 'Senior', 'Puppy'],
    },
  ],

  // Custom terminology
  terminology: {
    subscription: 'subscription',
    delivery: 'delivery',
    skip: 'skip this delivery',
    pause: 'pause subscription',
  },

  // Feature toggles
  features: {
    rewards: true,
    referrals: true,
    productSwap: true,
    quickReorder: true,
  },
};
```

### Add Profile Components

Create custom profile fields in `src/components/profile/`:

```typescript
// src/components/profile/PetProfile.tsx
export function PetProfile({ pet, onUpdate }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Pet Profile</h2>
      {/* Your pet profile fields */}
    </div>
  );
}
```

## Page Customization

### Dashboard Widgets

Add custom widgets to the dashboard:

```typescript
// src/components/dashboard/UpcomingDeliveryWidget.tsx
export function UpcomingDeliveryWidget({ subscription }) {
  return (
    <div className="bg-white rounded-xl p-4 border">
      <h3>Next Delivery</h3>
      {/* Widget content */}
    </div>
  );
}
```

Use in dashboard:

```typescript
// src/app/(portal)/dashboard/page.tsx
import { UpcomingDeliveryWidget } from '@/components/dashboard/UpcomingDeliveryWidget'

export default function Dashboard() {
  return (
    <div>
      <UpcomingDeliveryWidget subscription={activeSubscription} />
    </div>
  );
}
```

### Navigation

Customize navigation in `src/components/ui/PortalNav.tsx`:

```typescript
const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { href: '/subscriptions', label: 'Subscriptions', icon: '📦' },
  { href: '/orders', label: 'Orders', icon: '📋' },
  { href: '/profile', label: 'Profile', icon: '👤' },
  { href: '/rewards', label: 'Rewards', icon: '🎁' },
  // Add your custom pages
  { href: '/pet-profile', label: 'My Pet', icon: '🐕' },
];
```

## Dark Mode

Enable dark mode by adding the toggle:

```typescript
// src/components/ui/ThemeToggle.tsx
'use client'

export function ThemeToggle() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}
```

Use Tailwind's `dark:` prefix for dark styles:

```html
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

## PWA Configuration

### Manifest

Edit `public/manifest.json`:

```json
{
  "name": "My Customer Portal",
  "short_name": "Portal",
  "description": "Manage your subscription",
  "start_url": "/dashboard",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0ea5e9",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker

The template includes a basic service worker. Customize caching in `public/sw.js`.

## Email Templates

Customize magic link email templates in AIVA dashboard or configure SMTP for custom sending.
