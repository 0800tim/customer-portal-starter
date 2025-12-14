/**
 * AIVA API Client
 *
 * This client provides access to AIVA subscription data and customer intelligence.
 * Configure with your AIVA_API_KEY in .env.local
 */

const AIVA_API_URL = process.env.AIVA_API_URL || 'https://api.aiva.dev'
const AIVA_API_KEY = process.env.AIVA_API_KEY

interface Subscription {
  id: string
  status: 'active' | 'paused' | 'cancelled'
  productName: string
  productImage?: string
  frequency: string
  nextDeliveryDate: string
  price: number
  currency: string
}

interface Customer {
  id: string
  email: string
  firstName?: string
  lastName?: string
  createdAt: string
}

interface Order {
  id: string
  orderNumber: string
  status: string
  createdAt: string
  total: number
  currency: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
}

async function aivaFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${AIVA_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AIVA_API_KEY}`,
      ...options?.headers,
    },
  })

  if (!res.ok) {
    throw new Error(`AIVA API error: ${res.status}`)
  }

  return res.json()
}

export const aiva = {
  subscriptions: {
    async list(): Promise<Subscription[]> {
      return aivaFetch('/v1/subscriptions')
    },

    async get(id: string): Promise<Subscription> {
      return aivaFetch(`/v1/subscriptions/${id}`)
    },

    async pause(id: string): Promise<void> {
      await aivaFetch(`/v1/subscriptions/${id}/pause`, { method: 'POST' })
    },

    async resume(id: string): Promise<void> {
      await aivaFetch(`/v1/subscriptions/${id}/resume`, { method: 'POST' })
    },

    async skip(id: string): Promise<void> {
      await aivaFetch(`/v1/subscriptions/${id}/skip`, { method: 'POST' })
    },

    async cancel(id: string): Promise<void> {
      await aivaFetch(`/v1/subscriptions/${id}/cancel`, { method: 'POST' })
    },
  },

  customer: {
    async get(): Promise<Customer> {
      return aivaFetch('/v1/customer')
    },

    async update(data: Partial<Customer>): Promise<Customer> {
      return aivaFetch('/v1/customer', {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
    },
  },

  orders: {
    async list(): Promise<Order[]> {
      return aivaFetch('/v1/orders')
    },

    async get(id: string): Promise<Order> {
      return aivaFetch(`/v1/orders/${id}`)
    },
  },

  auth: {
    async sendMagicLink(email: string): Promise<void> {
      await aivaFetch('/v1/auth/magic-link', {
        method: 'POST',
        body: JSON.stringify({ email }),
      })
    },

    async verifyMagicLink(token: string): Promise<{ customerId: string; email: string }> {
      return aivaFetch('/v1/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ token }),
      })
    },
  },
}
