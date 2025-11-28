import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (mounted) {
                setUser(currentUser);
                setLoading(false);

                // Sync with localStorage for legacy components if needed
                if (currentUser) {
                    localStorage.setItem('isAuthenticated', 'true');
                } else {
                    localStorage.removeItem('isAuthenticated');
                    localStorage.removeItem('userPhone');
                }
            }
        });

        // Fallback if Firebase takes too long (e.g. 5 seconds)
        // This prevents the app from being stuck on a white screen if Firebase fails to init
        const timeout = setTimeout(() => {
            if (mounted && loading) {
                console.warn("Firebase auth state change timed out, defaulting to unauthenticated");
                setLoading(false);
            }
        }, 5000);

        return () => {
            mounted = false;
            unsubscribe();
            clearTimeout(timeout);
        };
    }, []);

    const logout = async () => {
        await signOut(auth);
    };

    if (loading) {
        console.log("AuthProvider: Loading...");
        return (
            <div style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                color: 'black',
                fontSize: '24px'
            }}>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" style={{ marginBottom: '20px' }}></div>
                Loading Harvest Guard...
            </div>
        );
    }

    console.log("AuthProvider: Render children, user:", user ? "Logged In" : "Guest");

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
