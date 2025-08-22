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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center">
              <Logo className="scale-50 sm:scale-75" />
              <div className="ml-4 hidden sm:block">
                <h1 className="text-xl font-semibold text-gray-800">Claude's Reinigungsservice</h1>
                <p className="text-sm text-gray-500">Verwaltungssystem</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={onLogout}
              size="sm"
              className="transition-all duration-300 hover:border-[#2dd4bf] hover:text-[#2dd4bf] hover:shadow-md text-xs sm:text-sm"
            >
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-3 sm:py-4 px-4 sm:px-6 border-b-3 font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap rounded-t-lg ${
                activeTab === 'dashboard'
                  ? 'border-[#2dd4bf] text-[#2dd4bf] bg-[#2dd4bf]/5'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              🏠 Dashboard
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`py-3 sm:py-4 px-4 sm:px-6 border-b-3 font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap rounded-t-lg ${
                activeTab === 'calendar'
                  ? 'border-[#2dd4bf] text-[#2dd4bf] bg-[#2dd4bf]/5'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              📅 Kalender
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`py-3 sm:py-4 px-4 sm:px-6 border-b-3 font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap rounded-t-lg ${
                activeTab === 'clients'
                  ? 'border-[#2dd4bf] text-[#2dd4bf] bg-[#2dd4bf]/5'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              👥 Kunden
            </button>
            <button
              onClick={() => setActiveTab('workers')}
              className={`py-3 sm:py-4 px-4 sm:px-6 border-b-3 font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap rounded-t-lg ${
                activeTab === 'workers'
                  ? 'border-[#2dd4bf] text-[#2dd4bf] bg-[#2dd4bf]/5'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              🧹 Mitarbeiter
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-[#2dd4bf]/10 via-[#2dd4bf]/5 to-transparent rounded-2xl p-6 sm:p-8 border border-[#2dd4bf]/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{greeting}!</h2>
                  <p className="text-gray-600">Willkommen zurück in Ihrem Reinigungsservice-Dashboard</p>
                  <p className="text-sm text-gray-500 mt-1">{currentDate.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-[#2dd4bf]/10 rounded-full">
                  <span className="text-2xl">👋</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              <Card className="hover-lift transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100/50">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl mb-2">📅</div>
                  <div className="text-lg sm:text-2xl font-bold text-blue-600">12</div>
                  <p className="text-xs sm:text-sm text-gray-600">Termine heute</p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100/50">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl mb-2">👥</div>
                  <div className="text-lg sm:text-2xl font-bold text-green-600">45</div>
                  <p className="text-xs sm:text-sm text-gray-600">Aktive Kunden</p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100/50">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl mb-2">🧹</div>
                  <div className="text-lg sm:text-2xl font-bold text-purple-600">8</div>
                  <p className="text-xs sm:text-sm text-gray-600">Mitarbeiter</p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100/50">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="text-2xl sm:text-3xl mb-2">💰</div>
                  <div className="text-lg sm:text-2xl font-bold text-orange-600">€2.4K</div>
                  <p className="text-xs sm:text-sm text-gray-600">Monatsumsatz</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card className="hover-lift transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-xl">⚡</span>
                    Schnellaktionen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    onClick={() => setActiveTab('calendar')} 
                    className="w-full bg-[#2dd4bf] hover:bg-[#26c2ab] transition-all duration-300"
                    size="sm"
                  >
                    Neuer Termin
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('clients')} 
                    variant="outline" 
                    className="w-full hover:border-[#2dd4bf] hover:text-[#2dd4bf] transition-all duration-300"
                    size="sm"
                  >
                    Kunde hinzufügen
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('workers')} 
                    variant="outline" 
                    className="w-full hover:border-[#2dd4bf] hover:text-[#2dd4bf] transition-all duration-300"
                    size="sm"
                  >
                    Mitarbeiter verwalten
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover-lift transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-xl">📊</span>
                    Heutige Übersicht
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Abgeschlossen</span>
                    <span className="font-semibold text-green-600">8/12</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">In Bearbeitung</span>
                    <span className="font-semibold text-yellow-600">3/12</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">Ausstehend</span>
                    <span className="font-semibold text-red-600">1/12</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-[#2dd4bf] h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-gray-50 sm:col-span-2 lg:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-xl">📈</span>
                    Wochentrend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Diese Woche</span>
                      <span className="font-semibold text-[#2dd4bf]">64 Termine</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Letzte Woche</span>
                      <span className="font-semibold text-gray-500">58 Termine</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-green-600">↗ +10%</span>
                      <span className="text-xs text-gray-500">Verbesserung</span>
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