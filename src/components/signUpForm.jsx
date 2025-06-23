'use client'

import { useState } from 'react' 
import { useRouter } from 'next/navigation'
import { supabase } from '@/libs/supbaseClient'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e ) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Step 1: Sign up with email/password
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError || !signUpData.user) {
      setError(signUpError?.message || 'Signup failed')
      setLoading(false)
      return
    }

    // Step 2: Insert username into profiles table
    const { error: profileError } = await supabase.from('profiles').insert({
      id: signUpData.user.id,
      username,
    })

    if (profileError) {
      setError(profileError.message)
      setLoading(false)
      return
    }

    router.push('/login') // Redirect or show success
    setLoading(false)
  }

  return (
    <form onSubmit={handleSignup} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">Sign Up</h2>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
        className="border rounded px-4 py-2 w-full"
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="border rounded px-4 py-2 w-full"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="border rounded px-4 py-2 w-full"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  )
}
