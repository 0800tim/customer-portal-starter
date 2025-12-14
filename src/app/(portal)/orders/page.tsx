import { aiva } from '@/lib/aiva'
import { formatCurrency, formatDate } from '@/lib/utils'

export default async function OrdersPage() {
  const orders = await aiva.orders.list()

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Order History
      </h1>

      {orders.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-12 text-center">
          <p className="text-gray-600">No orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-gray-900">
                    Order #{order.orderNumber}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(order.total, order.currency)}
                  </p>
                  <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="text-sm text-gray-600">
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
