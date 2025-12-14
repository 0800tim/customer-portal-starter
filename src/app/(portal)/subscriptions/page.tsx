import { aiva } from '@/lib/aiva'
import { SubscriptionCard } from '@/components/subscription/SubscriptionCard'

export default async function SubscriptionsPage() {
  const subscriptions = await aiva.subscriptions.list()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Your Subscriptions
      </h1>

      {subscriptions.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <p className="text-gray-600 mb-4">No subscriptions yet</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Browse Products
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
            />
          ))}
        </div>
      )}
    </div>
  )
}
