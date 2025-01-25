import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h2 className="text-3xl font-semibold mb-4">Welcome to the Private Page</h2>
        <p className="text-lg mb-4">Your email: <span className="font-bold">{data.user.email}</span> is confirmed!</p>
        <p className="text-sm text-gray-400">You have access to the private area now.</p>
      </div>
    </div>
  )
}
