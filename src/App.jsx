import { useState } from 'react'
import { supabase } from './supabase'

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) alert(error.message)
    else setUser(data.user)
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (user) {
    return (
      <div style={{ padding: 40 }}>
        <h2>المستخدم مسجّل دخول ✅</h2>
        <p>{user.email}</p>
        <button onClick={signOut}>Logout</button>
      </div>
    )
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>تسجيل الدخول</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />
      <button onClick={signIn}>Login</button>
    </div>
  )
}
