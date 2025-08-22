import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/ui/logo"

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Check credentials
    if (email === 'eric.baackt@outlook.de' && password === 'tata.lela13') {
      // Simulate loading
      setTimeout(() => {
        setIsLoading(false)
        onLogin()
      }, 1000)
    } else {
      setTimeout(() => {
        setIsLoading(false)
        setError('Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.')
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <Card className="w-full hover-lift animate-scale-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Anmelden</CardTitle>
            <CardDescription className="text-center">
              Melden Sie sich bei Ihrem Claude's Reinigungsservice-Account an
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
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
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ihr Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all-smooth focus:ring-[#2dd4bf]"
                  disabled={isLoading}
                />
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 animate-slide-up">
                  <p className="text-red-800 text-sm">{error}</p>
                </div>
              )}
              
              <Button 
                type="submit"
                className="w-full h-12 text-lg bg-[#2dd4bf] hover:bg-[#26c2ab] transition-all-smooth disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Wird angemeldet...' : 'Anmelden'}
              </Button>
            </form>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                Verwalten Sie Ihre Kunden, Mitarbeiter und Termine
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}