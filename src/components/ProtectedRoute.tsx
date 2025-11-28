import { Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

interface ProtectedRouteProps {
    children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    const location = useLocation()
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const alertShownRef = useRef(false)

    useEffect(() => {
        if (!isAuthenticated && !shouldRedirect && !alertShownRef.current) {
            alertShownRef.current = true
            // Show alert message
            const pageName = location.pathname === '/dashboard' ? 'Dashboard' : 'AI Chatbot'
            alert(`Please login first to access ${pageName}!\n\nআপনাকে ${pageName === 'Dashboard' ? 'ড্যাশবোর্ড' : 'এআই চ্যাটবট'} অ্যাক্সেস করতে প্রথমে লগইন করতে হবে!`)
            setShouldRedirect(true)
        }
    }, [isAuthenticated, location.pathname, shouldRedirect])

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        if (shouldRedirect) {
            return <Navigate to="/login" replace state={{ from: location }} />
        }
        return null
    }

    return <>{children}</>
}
