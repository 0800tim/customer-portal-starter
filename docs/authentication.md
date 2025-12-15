# Authentication

The customer portal uses magic link authentication for passwordless login.

## How It Works

1. Customer enters their email
2. Server sends a magic link via AIVA
3. Customer clicks the link
4. Server verifies the token and creates a session
5. Customer is redirected to the dashboard

## Flow Diagram

```
Customer          Portal              AIVA
   │                │                   │
   │─── Email ─────>│                   │
   │                │── Send Magic ────>│
   │                │     Link          │
   │                │<── Confirm ───────│
   │<── Check       │                   │
   │    Email ──────│                   │
   │                │                   │
   │─── Click ─────>│                   │
   │    Link        │── Verify ────────>│
   │                │     Token         │
   │                │<── Customer ──────│
   │                │     Data          │
   │<── Redirect ───│                   │
   │    to Dashboard│                   │
```

## Configuration

### Environment Variables

```bash
# Required for auth
JWT_SECRET=your-secret-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
AIVA_API_KEY=your-api-key
```

### Generate JWT Secret

```bash
openssl rand -hex 32
```

## Session Management

Sessions are stored in HTTP-only cookies with the following properties:

- **Duration**: 7 days
- **Security**: HTTP-only, Secure (in production), SameSite=Lax
- **Algorithm**: HS256

### Session Token Structure

```typescript
interface Session {
  customerId: string;
  email: string;
  iat: number;  // Issued at
  exp: number;  // Expiration
}
```

## API Routes

### POST /api/auth/magic-link

Request a magic link.

**Request:**
```json
{
  "email": "customer@example.com"
}
```

**Response:**
```json
{
  "success": true
}
```

### GET /api/auth/callback

Verify magic link and create session.

**Query Parameters:**
- `token` - The magic link token

**Response:**
Redirects to `/dashboard` on success, `/login?error=...` on failure.

## Protected Routes

Routes under `(portal)/` are protected. The middleware checks for a valid session:

```typescript
// src/middleware.ts
export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
```

## Custom Auth Provider

To use a different authentication provider:

### 1. Update Auth Library

```typescript
// src/lib/auth.ts
import { YourAuthProvider } from 'your-auth-provider';

export async function getSession() {
  // Your custom session logic
}

export async function createSession(user: User) {
  // Your custom session creation
}
```

### 2. Update Login Page

```typescript
// src/app/(auth)/login/page.tsx
export default function LoginPage() {
  // Your custom login UI
}
```

### 3. Update Callback Route

```typescript
// src/app/api/auth/callback/route.ts
export async function GET(request: NextRequest) {
  // Your custom callback logic
}
```

## Social Login (Optional)

To add social login options:

### 1. Install Provider SDK

```bash
npm install @auth/core
```

### 2. Configure Providers

```typescript
// src/lib/auth.ts
import Google from '@auth/core/providers/google';

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
```

### 3. Add Login Buttons

```typescript
// src/app/(auth)/login/page.tsx
<button onClick={() => signIn('google')}>
  Continue with Google
</button>
```

## Security Best Practices

1. **Always use HTTPS in production**
2. **Keep JWT_SECRET secure and rotate periodically**
3. **Set appropriate cookie options**
4. **Implement rate limiting on auth endpoints**
5. **Log failed authentication attempts**
6. **Use short token expiration for magic links (15 min default)**
