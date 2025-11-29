import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { LanguageProvider } from '@/lib/language-context'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import ScrollToTop from '@/components/ScrollToTop'
import { VoiceAssistant } from '@/components/VoiceAssistant'
import { Toaster } from 'sonner'

// Lazy load pages for better performance
const HomePage = lazy(() => import('@/pages/Home'))
const AboutPage = lazy(() => import('@/pages/About'))
const ProblemPage = lazy(() => import('@/pages/Problem'))
const ApproachPage = lazy(() => import('@/pages/Approach'))
const DashboardPage = lazy(() => import('@/pages/Dashboard'))
const LocalRiskPage = lazy(() => import('@/pages/LocalRisk'))
const ChatbotPage = lazy(() => import('@/pages/Chatbot'))
const FarmersPage = lazy(() => import('@/pages/Farmers'))
const PublicPage = lazy(() => import('@/pages/Public'))
const RoadmapPage = lazy(() => import('@/pages/Roadmap'))
const ContactPage = lazy(() => import('@/pages/Contact'))
const LoginPage = lazy(() => import('@/pages/Login'))
const ScannerPage = lazy(() => import('@/pages/Scanner'))
const StorageGuidePage = lazy(() => import('@/pages/StorageGuide'))
const ResourcesPage = lazy(() => import('@/pages/Resources'))

// Loading component
const Loading = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
        </div>
    </div>
)


import { AuthProvider } from '@/lib/auth-context'

export default function App() {
    return (
        <AuthProvider>
            <LanguageProvider>
                <div className="flex flex-col min-h-screen font-sans antialiased">
                    <ScrollToTop />
                    <Navbar />
                    <main className="grow">
                        <Suspense fallback={<Loading />}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/about" element={<AboutPage />} />
                                <Route path="/problem" element={<ProblemPage />} />
                                <Route path="/approach" element={<ApproachPage />} />
                                <Route path="/dashboard" element={
                                    <ProtectedRoute>
                                        <DashboardPage />
                                    </ProtectedRoute>
                                } />
                                <Route path="/chatbot" element={
                                    <ProtectedRoute>
                                        <ChatbotPage />
                                    </ProtectedRoute>
                                } />
                                <Route path="/local-risk" element={
                                    <ProtectedRoute>
                                        <LocalRiskPage />
                                    </ProtectedRoute>
                                } />
                                <Route path="/farmers" element={<FarmersPage />} />
                                <Route path="/public" element={<PublicPage />} />
                                <Route path="/roadmap" element={<RoadmapPage />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/scanner" element={<ScannerPage />} />
                                <Route path="/storage-guide" element={
                                    <ProtectedRoute>
                                        <StorageGuidePage />
                                    </ProtectedRoute>
                                } />
                                <Route path="/resources" element={
                                    <ProtectedRoute>
                                        <ResourcesPage />
                                    </ProtectedRoute>
                                } />
                            </Routes>
                        </Suspense>
                    </main>
                    <Footer />
                    <VoiceAssistant />
                    <Toaster />
                </div >
            </LanguageProvider >
        </AuthProvider >
    )
}
