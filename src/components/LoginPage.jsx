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
    } catch (err) {
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>
          <Card className="w-full hover-lift animate-scale-in">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Passwort zurücksetzen</CardTitle>
              <CardDescription className="text-center">
                Geben Sie Ihre E-Mail-Adresse ein, um einen Reset-Link zu erhalten
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail-Adresse</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ihre E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="transition-all-smooth focus:ring-[#2dd4bf]"
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
                  className="w-full h-12 text-lg bg-[#2dd4bf] hover:bg-[#26c2ab] transition-all-smooth disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Wird gesendet...' : 'E-Mail senden'}
                </Button>
              </form>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="text-sm text-[#2dd4bf] hover:underline transition-all-smooth"
                >
                  Zurück zur Anmeldung
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <Card className="w-full hover-lift animate-scale-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {isSignUp ? 'Registrieren' : 'Anmelden'}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignUp 
                ? 'Erstellen Sie einen neuen Account für Claude\'s Reinigungsservice'
                : 'Melden Sie sich bei Ihrem Claude\'s Reinigungsservice-Account an'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail-Adresse</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ihre E-Mail-Adresse"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all-smooth focus:ring-[#2dd4bf]"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={isSignUp ? "Wählen Sie ein starkes Passwort" : "Ihr Passwort"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all-smooth focus:ring-[#2dd4bf]"
                  disabled={loading}
                />
                {isSignUp && (
                  <p className="text-xs text-gray-500">
                    Das Passwort sollte mindestens 6 Zeichen lang sein
                  </p>
                )}
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
                className="w-full h-12 text-lg bg-[#2dd4bf] hover:bg-[#26c2ab] transition-all-smooth disabled:opacity-50"
                disabled={loading}
              >
                {loading 
                  ? (isSignUp ? 'Wird registriert...' : 'Wird angemeldet...') 
                  : (isSignUp ? 'Registrieren' : 'Anmelden')
                }
              </Button>
            </form>
            
            <div className="space-y-4">
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp)
                    setError('')
                    setMessage('')
                  }}
                  className="text-sm text-[#2dd4bf] hover:underline transition-all-smooth"
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
                    className="text-sm text-gray-600 hover:text-[#2dd4bf] transition-all-smooth"
                  >
                    Passwort vergessen?
                  </button>
                </div>
              )}
              
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
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