export default function RewardsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Your Rewards
      </h1>

      {/* Points Balance */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white mb-8">
        <p className="text-sm opacity-90 mb-1">Your Points Balance</p>
        <p className="text-4xl font-bold">0</p>
        <p className="text-sm opacity-90 mt-2">
          Earn points with every order
        </p>
      </div>

      {/* How to Earn */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          How to Earn Points
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <EarnCard
            title="Place an Order"
            points="1 point per $1"
            icon="🛒"
          />
          <EarnCard
            title="Refer a Friend"
            points="100 points"
            icon="👥"
          />
          <EarnCard
            title="Leave a Review"
            points="25 points"
            icon="⭐"
          />
        </div>
      </section>

      {/* Rewards to Redeem */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Available Rewards
        </h2>
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <p className="text-gray-600">
            Keep earning points to unlock rewards!
          </p>
        </div>
      </section>
    </div>
  )
}

function EarnCard({
  title,
  points,
  icon,
}: {
  title: string
  points: string
  icon: string
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
      <span className="text-3xl">{icon}</span>
      <h3 className="font-medium text-gray-900 mt-2">{title}</h3>
      <p className="text-sm text-primary-600 font-medium">{points}</p>
    </div>
  )
}
