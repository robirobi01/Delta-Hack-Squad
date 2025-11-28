import { Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useAuth } from '@/lib/auth-context'

interface ProtectedRouteProps {
    children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth()
    const location = useLocation()
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const alertShownRef = useRef(false)

    useEffect(() => {
        if (!loading && !user && !shouldRedirect && !alertShownRef.current) {
            alertShownRef.current = true
            // Show alert message
            const pageName = location.pathname === '/dashboard' ? 'Dashboard' : 'AI Chatbot'
            alert(`Please login first to access ${pageName}!\n\nআপনাকে ${pageName === 'Dashboard' ? 'ড্যাশবোর্ড' : 'এআই চ্যাটবট'} অ্যাক্সেস করতে প্রথমে লগইন করতে হবে!`)
            setShouldRedirect(true)
        }
    }, [user, loading, location.pathname, shouldRedirect])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        // Redirect to login if not authenticated
        if (shouldRedirect) {
            return <Navigate to="/login" replace state={{ from: location }} />
        }
        return null
    }

    return <>{children}</>
}
