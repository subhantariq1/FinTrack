import { createContext, useContext, useEffect, useState } from 'react'
import supabase from '../client'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data?.session?.user ?? null)
      setLoading(false)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const value = { user, loading }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
