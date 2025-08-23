import { LoginPage } from './components/LoginPage'
import { Dashboard } from './components/Dashboard'
import { AuthProvider, useAuth } from './contexts/AuthContext'

function AppContent() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen min-h-screen-mobile flex items-center justify-center bg-gradient-secondary safe-area-inset">
        <div className="text-center animate-fade-in">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#2dd4bf]/20 border-t-[#2dd4bf] mx-auto"></div>
            <div className="absolute inset-0 rounded-full bg-[#2dd4bf]/10 animate-glow-pulse"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium animate-slide-up animate-stagger-1">Wird geladen...</p>
          <div className="mt-2 w-24 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-primary animate-shimmer"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {user ? (
        <Dashboard onLogout={signOut} />
      ) : (
        <LoginPage />
      )}
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
