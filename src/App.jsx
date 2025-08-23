import { LoginPage } from './components/LoginPage'
import { Dashboard } from './components/Dashboard'
import { AuthProvider, useAuth } from './contexts/AuthContext'

function AppContent() {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2dd4bf] mx-auto"></div>
          <p className="mt-4 text-gray-600">Wird geladen...</p>
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
