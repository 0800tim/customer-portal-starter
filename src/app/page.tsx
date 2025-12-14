import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Your Customer Portal
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage your subscriptions, view orders, and update your profile.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/login"
            className="block p-6 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Sign In</h2>
            <p className="opacity-90">Access your account with magic link</p>
          </Link>

          <div className="p-6 bg-gray-100 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Features</h2>
            <ul className="text-gray-600 space-y-1">
              <li>Manage subscriptions</li>
              <li>View order history</li>
              <li>Update delivery schedule</li>
              <li>Access rewards</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
