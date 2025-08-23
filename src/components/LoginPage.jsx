import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/ui/logo"
import { useAuth } from '../contexts/AuthContext'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [message, setMessage] = useState('')
  
  const { signIn, signUp, resetPassword, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!email || !password) {
      setError('Bitte füllen Sie alle Felder aus.')
      return
    }

    try {
      if (isSignUp) {
        const { data, error } = await signUp(email, password, {
          full_name: email.split('@')[0] // Default name from email
        })
        
        if (error) {
          console.error('Sign up error:', error)
          setError(error.message)
        } else {
          console.log('Sign up success:', data)
          if (data.user && !data.user.email_confirmed_at) {
            setMessage('Registrierung erfolgreich! Bitte überprüfen Sie Ihre E-Mail für die Bestätigung.')
          } else {
            setMessage('Registrierung erfolgreich! Sie können sich jetzt anmelden.')
          }
          setIsSignUp(false)
        }
      } else {
        const { error } = await signIn(email, password)
        
        if (error) {
          console.error('Login error:', error)
          
          // Provide more specific error messages
          if (error.message.includes('Email not confirmed')) {
            setError('Bitte bestätigen Sie Ihre E-Mail-Adresse, bevor Sie sich anmelden.')
          } else if (error.message.includes('Invalid login credentials')) {
            setError('Ungültige Anmeldedaten. Bitte überprüfen Sie E-Mail und Passwort.')
          } else if (error.message.includes('Email not found')) {
            setError('Diese E-Mail-Adresse ist nicht registriert.')
          } else {
            setError(`Anmeldefehler: ${error.message}`)
          }
        }
      }
    } catch {
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!email) {
      setError('Bitte geben Sie Ihre E-Mail-Adresse ein.')
      return
    }

    const { error } = await resetPassword(email)
    
    if (error) {
      setError('Fehler beim Senden der E-Mail. Bitte versuchen Sie es erneut.')
    } else {
      setMessage('E-Mail zum Zurücksetzen des Passworts wurde gesendet!')
      setShowForgotPassword(false)
    }
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen min-h-[100dvh] flex items-center justify-center bg-gradient-neutral py-4 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        {/* Mobile-optimized background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-brand-primary rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-glow-pulse"></div>
          <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-brand-primary-light rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-glow-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-sm sm:max-w-md w-full space-y-6 sm:space-y-8 relative z-10">
          <div className="flex justify-center mb-6 sm:mb-8 animate-float-in">
            <Logo />
          </div>
          <Card className="w-full hover-lift animate-scale-in animate-stagger-1 card-glass mx-auto">
            <CardHeader className="space-y-2 sm:space-y-1 px-4 sm:px-6 pt-6 sm:pt-8">
              <CardTitle className="text-xl sm:text-2xl text-center text-gradient font-bold animate-slide-down animate-stagger-1">
                Passwort zurücksetzen
              </CardTitle>
              <CardDescription className="text-center text-sm sm:text-base text-gray-600 animate-slide-up animate-stagger-2 leading-relaxed">
                Geben Sie Ihre E-Mail-Adresse ein, um einen Reset-Link zu erhalten
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-4 sm:px-6 pb-6 sm:pb-8">
              <form onSubmit={handleForgotPassword} className="space-y-4 sm:space-y-6">
                <div className="space-y-2 animate-slide-up animate-stagger-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">E-Mail-Adresse</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ihre E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-primary h-12 sm:h-14 text-base"
                    disabled={loading}
                  />
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 animate-slide-up">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}
                
                {message && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3 animate-slide-up">
                    <p className="text-green-800 text-sm">{message}</p>
                  </div>
                )}
                
                <Button 
                  type="submit"
                  className="w-full h-12 sm:h-14 text-base sm:text-lg btn-primary animate-slide-up animate-stagger-3 relative overflow-hidden disabled:opacity-50"
                  disabled={loading}
                >
                  {loading && (
                    <div className="absolute inset-0 bg-brand-primary animate-shimmer"></div>
                  )}
                  <div className="relative z-10 flex items-center justify-center space-x-2">
                    {loading ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Wird gesendet...</span>
                      </>
                    ) : (
                      <span>E-Mail senden</span>
                    )}
                  </div>
                </Button>
              </form>
              
              <div className="text-center animate-fade-in animate-stagger-4">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="text-sm sm:text-base text-brand-primary hover:text-brand-primary-dark transition-spring font-medium hover:scale-105 transform touch-manipulation py-2 px-4 rounded-lg hover:bg-brand-primary-light"
                >
                  ← Zurück zur Anmeldung
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen min-h-[100dvh] flex items-center justify-center bg-gradient-secondary py-4 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 animate-fade-in relative overflow-hidden">
      {/* Responsive animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-80 sm:h-80 bg-[#2dd4bf] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-glow-pulse"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-80 sm:h-80 bg-[#0d9488] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-glow-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-20 sm:top-40 left-1/2 w-30 h-30 sm:w-60 sm:h-60 bg-[#2dd4bf] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-glow-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-sm sm:max-w-md w-full space-y-6 sm:space-y-8 relative z-10">
        <div className="flex justify-center mb-6 sm:mb-8 animate-float-in">
          <Logo />
        </div>
        <Card className="w-full hover-lift animate-scale-in glass-effect border-0 shadow-2xl backdrop-blur-xl mx-auto">
          <CardHeader className="space-y-2 sm:space-y-1 px-4 sm:px-6 pt-6 sm:pt-8">
            <CardTitle className="text-2xl sm:text-3xl text-center text-gradient font-bold animate-slide-down animate-stagger-1">
              {isSignUp ? 'Registrieren' : 'Anmelden'}
            </CardTitle>
            <CardDescription className="text-center text-sm sm:text-base text-gray-600 animate-slide-up animate-stagger-2 leading-relaxed px-2 sm:px-0">
              {isSignUp 
                ? 'Erstellen Sie einen neuen Account für Claude\'s Reinigungsservice'
                : 'Melden Sie sich bei Ihrem Claude\'s Reinigungsservice-Account an'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-4 sm:px-6 pb-6 sm:pb-8">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="space-y-2 animate-slide-up animate-stagger-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">E-Mail-Adresse</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ihre@email.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-spring input-glow border-gray-200 focus:border-[#2dd4bf] bg-white/50 h-12 sm:h-14 text-base"
                  disabled={loading}
                  autoComplete="email"
                  inputMode="email"
                />
              </div>
              <div className="space-y-2 animate-slide-up animate-stagger-3">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={isSignUp ? "Starkes Passwort wählen" : "Ihr Passwort"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-spring input-glow border-gray-200 focus:border-[#2dd4bf] bg-white/50 h-12 sm:h-14 text-base"
                  disabled={loading}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                />
                {isSignUp && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Mindestens 6 Zeichen
                  </p>
                )}
              </div>
              
              {error && (
                <div className="bg-red-50/80 border border-red-200 rounded-lg p-3 sm:p-4 animate-bounce-gentle backdrop-blur-sm">
                  <p className="text-red-800 text-sm font-medium leading-relaxed">{error}</p>
                </div>
              )}
              
              {message && (
                <div className="bg-green-50/80 border border-green-200 rounded-lg p-3 sm:p-4 animate-bounce-gentle backdrop-blur-sm">
                  <p className="text-green-800 text-sm font-medium leading-relaxed">{message}</p>
                </div>
              )}
              
              <Button 
                type="submit"
                className="w-full h-12 sm:h-14 text-base sm:text-lg btn-primary animate-slide-up animate-stagger-4 relative overflow-hidden disabled:opacity-50"
                disabled={loading}
              >
                {loading && (
                  <div className="absolute inset-0 bg-brand-primary animate-shimmer"></div>
                )}
                <div className="relative z-10 flex items-center justify-center space-x-2">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{isSignUp ? 'Wird registriert...' : 'Wird angemeldet...'}</span>
                    </>
                  ) : (
                    <span>{isSignUp ? 'Registrieren' : 'Anmelden'}</span>
                  )}
                </div>
              </Button>
            </form>
            
            <div className="space-y-4 animate-fade-in animate-stagger-4">
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setError('')
                    setMessage('')
                  }}
                  className="text-sm sm:text-base text-brand-primary hover:text-brand-primary-dark transition-spring font-medium hover:scale-105 transform touch-manipulation py-2 px-4 rounded-lg hover:bg-brand-primary-light"
                >
                  {isSignUp 
                    ? 'Bereits einen Account? Hier anmelden' 
                    : 'Noch kein Account? Hier registrieren'
                  }
                </button>
              </div>
              
              {!isSignUp && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm sm:text-base text-gray-500 hover:text-[#2dd4bf] transition-spring font-medium hover:scale-105 transform touch-manipulation py-2 px-4 rounded-lg hover:bg-gray-50"
                  >
                    Passwort vergessen?
                  </button>
                </div>
              )}
              
              <div className="text-center text-xs sm:text-sm animate-fade-in animate-stagger-4 px-4 sm:px-0">
                <span className="text-gray-500 italic leading-relaxed">
                  Verwalten Sie Ihre Kunden, Mitarbeiter und Termine
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}