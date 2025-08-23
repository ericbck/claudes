import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"
import { Calendar } from "@/components/Calendar"
import { ClientsManagement } from "@/components/ClientsManagement"
import { WorkersManagement } from "@/components/WorkersManagement"

export function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard')

  const currentDate = new Date()
  const greeting = currentDate.getHours() < 12 ? 'Guten Morgen' : currentDate.getHours() < 17 ? 'Guten Tag' : 'Guten Abend'

  return (
    <div className="min-h-screen min-h-screen-mobile bg-gradient-neutral safe-area-inset">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-20">
            <div className="flex items-center min-w-0">
              <Logo className="scale-40 sm:scale-75 flex-shrink-0" />
              <div className="ml-2 sm:ml-4 min-w-0 flex-1">
                <h1 className="text-sm sm:text-xl font-semibold text-gray-800 truncate">
                  <span className="hidden sm:inline">Verwaltungssystem</span>
                  <span className="sm:hidden">Dashboard</span>
                </h1>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={onLogout}
              size="sm"
              className="btn-secondary text-xs sm:text-sm btn-touch flex-shrink-0"
            >
              <span className="hidden sm:inline">Abmelden</span>
              <span className="sm:hidden">Aus</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-neutral-200 sticky top-14 sm:top-20 z-40">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex space-x-0 sm:space-x-1 overflow-x-auto scrollbar-hide pb-safe">
            {[
              { key: 'dashboard', icon: '🏠', label: 'Dashboard', shortLabel: 'Home' },
              { key: 'calendar', icon: '📅', label: 'Kalender', shortLabel: 'Plan' },
              { key: 'clients', icon: '👥', label: 'Kunden', shortLabel: 'Kunden' },
              { key: 'workers', icon: '🧹', label: 'Mitarbeiter', shortLabel: 'Team' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 sm:flex-none py-3 sm:py-4 px-2 sm:px-6 border-b-3 font-medium text-xs sm:text-sm transition-spring whitespace-nowrap rounded-t-lg touch-manipulation btn-touch focus-visible-enhanced ${
                  activeTab === tab.key
                    ? 'border-brand-primary text-brand-primary bg-brand-primary-light'
                    : 'border-transparent text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 active:bg-neutral-200'
                }`}
              >
                <span className="block sm:inline text-lg sm:text-base mb-1 sm:mb-0 sm:mr-2">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden text-xs">{tab.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 sm:py-6 lg:py-8 px-3 sm:px-6 lg:px-8 animate-fade-in pb-safe">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-brand-primary-light via-accent to-transparent rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-brand-primary/20 animate-slide-up card-secondary">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">{greeting}!</h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-1">Willkommen zurück in Ihrem Dashboard</p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {currentDate.toLocaleDateString('de-DE', { 
                      weekday: window.innerWidth < 640 ? 'short' : 'long', 
                      year: 'numeric', 
                      month: window.innerWidth < 640 ? 'short' : 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="hidden sm:flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-brand-primary-light rounded-full flex-shrink-0">
                  <span className="text-2xl">👋</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <Card className="hover-lift card-primary bg-gradient-info">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl mb-2">📅</div>
                  <div className="text-lg sm:text-2xl font-bold text-info">12</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Termine heute</p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift card-primary bg-gradient-success">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl mb-2">👥</div>
                  <div className="text-lg sm:text-2xl font-bold text-success">45</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Aktive Kunden</p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift card-primary" style={{background: 'linear-gradient(135deg, hsl(274 61% 96%) 0%, hsl(274 61% 96%) 100%)'}}>
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl mb-2">🧹</div>
                  <div className="text-lg sm:text-2xl font-bold" style={{color: 'hsl(274 61% 46%)'}}>8</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Mitarbeiter</p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift card-primary bg-gradient-warning">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl mb-2">💰</div>
                  <div className="text-lg sm:text-2xl font-bold text-warning">€2.4K</div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Monatsumsatz</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card className="hover-lift card-primary">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-xl">⚡</span>
                    Schnellaktionen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setActiveTab('calendar')} 
                    className="w-full btn-primary"
                    size="sm"
                  >
                    Neuer Termin
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('clients')} 
                    className="w-full btn-secondary"
                    size="sm"
                  >
                    Kunde hinzufügen
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('workers')} 
                    className="w-full btn-secondary"
                    size="sm"
                  >
                    Mitarbeiter verwalten
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-lift card-primary">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-xl">📊</span>
                    Heutige Übersicht
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Abgeschlossen</span>
                    <span className="font-semibold text-success">8/12</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">In Bearbeitung</span>
                    <span className="font-semibold text-warning">3/12</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">Ausstehend</span>
                    <span className="font-semibold text-error">1/12</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2 mt-3">
                    <div className="bg-brand-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift card-primary sm:col-span-2 lg:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-xl">📈</span>
                    Wochentrend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Diese Woche</span>
                      <span className="font-semibold text-brand-primary">64 Termine</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Letzte Woche</span>
                      <span className="font-semibold text-neutral-500">58 Termine</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-success">↗ +10%</span>
                      <span className="text-xs text-muted-foreground">Verbesserung</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
        {activeTab === 'calendar' && <Calendar />}
        {activeTab === 'clients' && <ClientsManagement />}
        {activeTab === 'workers' && <WorkersManagement />}
      </main>
    </div>
  )
}