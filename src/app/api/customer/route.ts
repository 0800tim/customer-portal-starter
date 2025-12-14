import { NextRequest, NextResponse } from 'next/server'
import { aiva } from '@/lib/aiva'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const customer = await aiva.customer.get()
    return NextResponse.json(customer)
  } catch (error) {
    console.error('Failed to get customer:', error)
    return NextResponse.json(
      { error: 'Failed to get customer' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    const customer = await aiva.customer.update(data)
    return NextResponse.json(customer)
  } catch (error) {
    console.error('Failed to update customer:', error)
    return NextResponse.json(
      { error: 'Failed to update customer' },
      { status: 500 }
    )
  }
}
