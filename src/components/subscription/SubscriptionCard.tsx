import Link from 'next/link'
import { cn, formatCurrency, formatRelativeDate } from '@/lib/utils'

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

interface SubscriptionCardProps {
  subscription: Subscription
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-gray-100 text-gray-800',
  }

  return (
    <Link
      href={`/subscriptions/${subscription.id}`}
      className="block bg-white border border-gray-200 rounded-xl p-4 hover:border-primary-500 hover:shadow-sm transition-all"
    >
      <div className="flex gap-4">
        {subscription.productImage && (
          <img
            src={subscription.productImage}
            alt={subscription.productName}
            className="w-16 h-16 rounded-lg object-cover"
          />
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 truncate">
              {subscription.productName}
            </h3>
            <span
              className={cn(
                'px-2 py-0.5 text-xs font-medium rounded-full capitalize',
                statusColors[subscription.status]
              )}
            >
              {subscription.status}
            </span>
          </div>

          <p className="text-sm text-gray-600 mt-1">
            {formatCurrency(subscription.price, subscription.currency)} / {subscription.frequency}
          </p>

          {subscription.status === 'active' && (
            <p className="text-sm text-gray-500 mt-2">
              Next delivery: {formatRelativeDate(subscription.nextDeliveryDate)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
