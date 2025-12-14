import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { PortalNav } from '@/components/ui/PortalNav'

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PortalNav />
      <main>{children}</main>
    </div>
  )
}
