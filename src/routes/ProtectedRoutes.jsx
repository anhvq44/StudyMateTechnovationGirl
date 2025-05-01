import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../supabase_config'

export default function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            setSession(session)
            setLoading(false)
        }

        getSession()
    }, [])

    if (loading) return <div>Loading...</div>

    if (!session) {
        return <Navigate to="/welcome-to-studymate" />
    }

    return children
}