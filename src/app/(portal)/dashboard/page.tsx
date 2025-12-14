import { aiva } from '@/lib/aiva'
import { SubscriptionCard } from '@/components/subscription/SubscriptionCard'

export default async function DashboardPage() {
  // Fetch data from AIVA
  const subscriptions = await aiva.subscriptions.list()
  const customer = await aiva.customer.get()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back{customer?.firstName ? `, ${customer.firstName}` : ''}
        </h1>
        <p className="text-gray-600 mt-1">
          Here&apos;s an overview of your subscriptions
        </p>
      </div>

      {/* Active Subscriptions */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Active Subscriptions
        </h2>

        {subscriptions.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-600">No active subscriptions</p>
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
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAction href="/subscriptions" label="Manage Subscriptions" icon="📦" />
          <QuickAction href="/orders" label="View Orders" icon="📋" />
          <QuickAction href="/profile" label="Update Profile" icon="👤" />
          <QuickAction href="/rewards" label="Your Rewards" icon="🎁" />
        </div>
      </section>
    </div>
  )
}

function QuickAction({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <a
      href={href}
      className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-xl hover:border-primary-500 hover:shadow-sm transition-all"
    >
      <span className="text-2xl mb-2">{icon}</span>
      <span className="text-sm text-gray-700 text-center">{label}</span>
    </a>
  )
}
