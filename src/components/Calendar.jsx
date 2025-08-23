import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentWeek, setCurrentWeek] = useState(0)
  const [viewMode, setViewMode] = useState('month') // 'month' or 'week'
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      kunde: 'Maria Schmidt',
      mitarbeiter: 'Anna Müller',
      zeit: '09:00',
      datum: '2025-01-20',
      adresse: 'Hauptstraße 15, 10115 Berlin',
      service: 'Grundreinigung',
      dauer: '2h',
      status: 'bestätigt'
    },
    {
      id: 2,
      kunde: 'Familie Weber',
      mitarbeiter: 'Klaus Fischer',
      zeit: '14:00',
      datum: '2025-01-20',
      adresse: 'Gartenstraße 8, 80331 München',
      service: 'Tiefenreinigung',
      dauer: '3h',
      status: 'bestätigt'
    },
    {
      id: 3,
      kunde: 'Emma Bauer',
      mitarbeiter: 'Anna Müller',
      zeit: '10:30',
      datum: '2025-01-21',
      adresse: 'Rosenweg 22, 20095 Hamburg',
      service: 'Fensterreinigung',
      dauer: '1.5h',
      status: 'ausstehend'
    },
    {
      id: 4,
      kunde: 'Thomas Huber',
      mitarbeiter: 'Sophie Wagner',
      zeit: '08:00',
      datum: '2025-01-21',
      adresse: 'Kirchplatz 5, 50667 Köln',
      service: 'Büroreinigung',
      dauer: '2.5h',
      status: 'bestätigt'
    },
    {
      id: 5,
      kunde: 'Praxis Dr. Müller',
      mitarbeiter: 'Klaus Fischer',
      zeit: '16:00',
      datum: '2025-01-22',
      adresse: 'Bahnhofstraße 12, 60329 Frankfurt',
      service: 'Praxisreinigung',
      dauer: '2h',
      status: 'bestätigt'
    },
    {
      id: 6,
      kunde: 'Sabine Koch',
      mitarbeiter: 'Anna Müller',
      zeit: '13:00',
      datum: '2025-01-22',
      adresse: 'Lindenallee 33, 40213 Düsseldorf',
      service: 'Grundreinigung',
      dauer: '2h',
      status: 'bestätigt'
    },
    {
      id: 7,
      kunde: 'Restaurant Bella Vista',
      mitarbeiter: 'Sophie Wagner',
      zeit: '07:00',
      datum: '2025-01-23',
      adresse: 'Marktplatz 7, 70173 Stuttgart',
      service: 'Gastronomiereinigung',
      dauer: '3h',
      status: 'bestätigt'
    },
    {
      id: 8,
      kunde: 'Familie Zimmermann',
      mitarbeiter: 'Klaus Fischer',
      zeit: '15:30',
      datum: '2025-01-24',
      adresse: 'Waldweg 18, 30159 Hannover',
      service: 'Grundreinigung',
      dauer: '2.5h',
      status: 'ausstehend'
    }
  ])

  // Customer list for dropdown
  const customers = [
    {
      id: 1,
      name: 'Maria Schmidt',
      address: 'Hauptstraße 15, 10115 Berlin',
      phone: '+49 30 12345678',
      email: 'maria.schmidt@email.com'
    },
    {
      id: 2,
      name: 'Familie Weber',
      address: 'Gartenstraße 8, 80331 München',
      phone: '+49 89 87654321',
      email: 'hans.weber@email.com'
    },
    {
      id: 3,
      name: 'Emma Bauer',
      address: 'Rosenweg 22, 20095 Hamburg',
      phone: '+49 40 11223344',
      email: 'emma.bauer@email.com'
    },
    {
      id: 4,
      name: 'Thomas Huber',
      address: 'Kirchplatz 5, 50667 Köln',
      phone: '+49 221 55566677',
      email: 'thomas.huber@email.com'
    }
  ]

  const workers = ['Anna Müller', 'Klaus Fischer', 'Sophie Wagner', 'Michael Braun']
  const services = ['Grundreinigung', 'Tiefenreinigung', 'Fensterreinigung', 'Büroreinigung', 'Praxisreinigung', 'Gastronomiereinigung']

  const [showAddForm, setShowAddForm] = useState(false)
  const [useExistingCustomer, setUseExistingCustomer] = useState(true)
  const [selectedCustomerId, setSelectedCustomerId] = useState('')
  const [newAppointment, setNewAppointment] = useState({
    kunde: '',
    mitarbeiter: '',
    zeit: '',
    datum: '',
    adresse: '',
    service: '',
    dauer: ''
  })

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    return firstDay === 0 ? 6 : firstDay - 1 // Make Monday = 0
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const formatDisplayDate = (date) => {
    return date.toLocaleDateString('de-DE', { 
      month: 'long',
      year: 'numeric'
    })
  }

  const getAppointmentsForDate = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dateStr = formatDate(date)
    return appointments.filter(apt => apt.datum === dateStr).sort((a, b) => a.zeit.localeCompare(b.zeit))
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setCurrentWeek(0)
  }

  // Week view helper functions
  const goToPreviousWeek = () => {
    setCurrentWeek(currentWeek - 1)
  }

  const goToNextWeek = () => {
    setCurrentWeek(currentWeek + 1)
  }

  const getWeekDates = () => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + 1 + (currentWeek * 7)) // Monday
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      return date
    })
  }

  const getAppointmentsForWeekDate = (date) => {
    const dateStr = formatDate(date)
    return appointments.filter(apt => apt.datum === dateStr).sort((a, b) => a.zeit.localeCompare(b.zeit))
  }

  const handleAddAppointment = (e) => {
    e.preventDefault()
    let appointmentData = { ...newAppointment }

    if (useExistingCustomer && selectedCustomerId) {
      const selectedCustomer = customers.find(c => c.id === parseInt(selectedCustomerId))
      if (selectedCustomer) {
        appointmentData.kunde = selectedCustomer.name
        appointmentData.adresse = selectedCustomer.address
      }
    }

    const newApt = {
      id: Date.now(),
      ...appointmentData,
      status: 'ausstehend'
    }
    setAppointments([...appointments, newApt])
    setNewAppointment({ kunde: '', mitarbeiter: '', zeit: '', datum: '', adresse: '', service: '', dauer: '' })
    setSelectedCustomerId('')
    setShowAddForm(false)
  }


  const getMitarbeiterColor = (mitarbeiter) => {
    const colors = {
      'Anna Müller': 'bg-gradient-info text-info',
      'Klaus Fischer': 'bg-gradient-success text-success',
      'Sophie Wagner': 'bg-gradient-warning text-warning',
      'Michael Braun': 'bg-gradient-error text-error'
    }
    return colors[mitarbeiter] || 'bg-muted text-muted-foreground'
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDayOfMonth = getFirstDayOfMonth(currentDate)
  const today = new Date()
  const isCurrentMonth = currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()

  // Create calendar grid
  const calendarDays = []
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const weekDays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Terminkalender</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            {viewMode === 'month' ? 'Monatsansicht' : 'Wochenansicht'} Ihrer Reinigungstermine
          </p>
        </div>
        <div className="flex items-center justify-between sm:space-x-4">
          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('month')}
              className={`text-xs sm:text-sm ${viewMode === 'month' ? 'bg-[#2dd4bf] hover:bg-[#26c2ab] text-white' : ''}`}
            >
              📅 Monat
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('week')}
              className={`text-xs sm:text-sm ${viewMode === 'week' ? 'bg-[#2dd4bf] hover:bg-[#26c2ab] text-white' : ''}`}
            >
              📆 Woche
            </Button>
          </div>
          
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            size="sm"
            className="bg-[#2dd4bf] hover:bg-[#26c2ab] transition-all-smooth text-xs sm:text-sm ml-2 sm:ml-0"
          >
            {showAddForm ? '✕' : '+ Termin'}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <Card className="hover-lift card-primary">
        <CardContent className="pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-4">
            {viewMode === 'month' ? (
              <>
                <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={goToPreviousMonth}
                    className="transition-all-smooth text-xs sm:text-sm"
                  >
                    ← Zurück
                  </Button>
                  <h2 className="text-lg sm:text-2xl font-semibold text-center">
                    {formatDisplayDate(currentDate)}
                  </h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={goToNextMonth}
                    className="transition-all-smooth text-xs sm:text-sm"
                  >
                    Vor →
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={goToToday}
                  className="transition-all-smooth text-xs sm:text-sm"
                >
                  📅 Heute
                </Button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={goToPreviousWeek}
                    className="transition-all-smooth text-xs sm:text-sm"
                  >
                    ← Zurück
                  </Button>
                  <h2 className="text-sm sm:text-lg font-semibold text-center">
                    {getWeekDates()[0].toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })} - {getWeekDates()[6].toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                  </h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={goToNextWeek}
                    className="transition-all-smooth text-xs sm:text-sm"
                  >
                    Vor →
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={goToToday}
                  className="transition-all-smooth text-xs sm:text-sm"
                >
                  📅 Diese Woche
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Appointment Form */}
      {showAddForm && (
        <Card className="animate-slide-up hover-lift">
          <CardHeader>
            <CardTitle className="text-[#2dd4bf]">Neuen Termin erstellen</CardTitle>
            <CardDescription>Fügen Sie einen neuen Reinigungstermin hinzu</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddAppointment} className="space-y-4">
              {/* Customer Selection Toggle */}
              <div className="flex space-x-4 mb-4">
                <Button
                  type="button"
                  variant={useExistingCustomer ? "default" : "outline"}
                  onClick={() => setUseExistingCustomer(true)}
                  className={useExistingCustomer ? "bg-[#2dd4bf] hover:bg-[#26c2ab]" : ""}
                >
                  Bestehender Kunde
                </Button>
                <Button
                  type="button"
                  variant={!useExistingCustomer ? "default" : "outline"}
                  onClick={() => setUseExistingCustomer(false)}
                  className={!useExistingCustomer ? "bg-[#2dd4bf] hover:bg-[#26c2ab]" : ""}
                >
                  Neuer Kunde
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Customer Selection */}
                {useExistingCustomer ? (
                  <div className="col-span-1 sm:col-span-2">
                    <Label htmlFor="customer-select">Kunde auswählen</Label>
                    <select
                      id="customer-select"
                      value={selectedCustomerId}
                      onChange={(e) => setSelectedCustomerId(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md transition-all-smooth focus:ring-[#2dd4bf] focus:border-[#2dd4bf]"
                      required
                    >
                      <option value="">-- Kunde auswählen --</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name} - {customer.address}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="kunde">Kundenname</Label>
                      <Input
                        id="kunde"
                        value={newAppointment.kunde}
                        onChange={(e) => setNewAppointment({...newAppointment, kunde: e.target.value})}
                        placeholder="Name des Kunden"
                        required
                        className="transition-all-smooth focus:ring-[#2dd4bf]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="adresse">Adresse</Label>
                      <Input
                        id="adresse"
                        value={newAppointment.adresse}
                        onChange={(e) => setNewAppointment({...newAppointment, adresse: e.target.value})}
                        placeholder="Vollständige Adresse"
                        required
                        className="transition-all-smooth focus:ring-[#2dd4bf]"
                      />
                    </div>
                  </>
                )}

                {/* Worker Selection */}
                <div>
                  <Label htmlFor="mitarbeiter">Mitarbeiter</Label>
                  <select
                    id="mitarbeiter"
                    value={newAppointment.mitarbeiter}
                    onChange={(e) => setNewAppointment({...newAppointment, mitarbeiter: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md transition-all-smooth focus:ring-[#2dd4bf] focus:border-[#2dd4bf]"
                    required
                  >
                    <option value="">-- Mitarbeiter auswählen --</option>
                    {workers.map((worker) => (
                      <option key={worker} value={worker}>
                        {worker}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Selection */}
                <div>
                  <Label htmlFor="service">Service</Label>
                  <select
                    id="service"
                    value={newAppointment.service}
                    onChange={(e) => setNewAppointment({...newAppointment, service: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md transition-all-smooth focus:ring-[#2dd4bf] focus:border-[#2dd4bf]"
                    required
                  >
                    <option value="">-- Service auswählen --</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="datum">Datum</Label>
                  <Input
                    id="datum"
                    type="date"
                    value={newAppointment.datum}
                    onChange={(e) => setNewAppointment({...newAppointment, datum: e.target.value})}
                    required
                    className="transition-all-smooth focus:ring-[#2dd4bf]"
                  />
                </div>

                <div>
                  <Label htmlFor="zeit">Uhrzeit</Label>
                  <Input
                    id="zeit"
                    type="time"
                    value={newAppointment.zeit}
                    onChange={(e) => setNewAppointment({...newAppointment, zeit: e.target.value})}
                    required
                    className="transition-all-smooth focus:ring-[#2dd4bf]"
                  />
                </div>

                <div>
                  <Label htmlFor="dauer">Dauer</Label>
                  <Input
                    id="dauer"
                    value={newAppointment.dauer}
                    onChange={(e) => setNewAppointment({...newAppointment, dauer: e.target.value})}
                    placeholder="z.B. 2h"
                    required
                    className="transition-all-smooth focus:ring-[#2dd4bf]"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#2dd4bf] hover:bg-[#26c2ab] transition-all-smooth">
                Termin erstellen
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Calendar View */}
      <Card className="hover-lift">
        <CardHeader>
          <CardTitle>{viewMode === 'month' ? 'Monatsübersicht' : 'Wochenübersicht'}</CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === 'month' ? (
            <>
              {/* Week day headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weekDays.map((day) => (
                  <div key={day} className="text-center font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  if (!day) {
                    return <div key={index} className="h-32"></div>
                  }

                  const dayAppointments = getAppointmentsForDate(day)
                  const isToday = isCurrentMonth && day === today.getDate()
                  
                  return (
                    <div 
                      key={day} 
                      className={`h-32 border rounded-lg p-2 transition-all-smooth hover:shadow-md ${
                        isToday ? 'bg-[#2dd4bf]/10 border-[#2dd4bf]' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-[#2dd4bf]' : 'text-gray-700'}`}>
                        {day}
                      </div>
                      <div className="space-y-1 overflow-y-auto max-h-24">
                        {dayAppointments.map((appointment) => (
                          <div 
                            key={appointment.id}
                            className="text-xs p-1 rounded border-l-2 border-[#2dd4bf] bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            <div className="font-medium">{appointment.zeit}</div>
                            <div className="text-gray-600 truncate">{appointment.kunde}</div>
                            <div className={`inline-block px-1 rounded text-xs ${getMitarbeiterColor(appointment.mitarbeiter)}`}>
                              {appointment.mitarbeiter.split(' ')[0]}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <>
              {/* Week view */}
              <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 sm:gap-4">
                {getWeekDates().map((date, index) => {
                  const dayAppointments = getAppointmentsForWeekDate(date)
                  const isToday = formatDate(date) === formatDate(new Date())
                  
                  return (
                    <Card 
                      key={index} 
                      className={`hover-lift transition-all-smooth ${isToday ? 'ring-2 ring-[#2dd4bf]' : ''}`}
                    >
                      <CardHeader className="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
                        <CardTitle className={`text-sm sm:text-base ${isToday ? 'text-[#2dd4bf]' : 'text-gray-600'}`}>
                          {weekDays[index]}
                        </CardTitle>
                        <CardDescription className={`text-base sm:text-lg font-semibold ${isToday ? 'text-[#2dd4bf]' : ''}`}>
                          {date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2 min-h-32 sm:min-h-96 px-3 sm:px-6">
                        {dayAppointments.length === 0 ? (
                          <p className="text-gray-400 text-xs sm:text-sm italic">Keine Termine</p>
                        ) : (
                          dayAppointments.map((appointment) => (
                            <div 
                              key={appointment.id} 
                              className="p-2 sm:p-3 border rounded-lg animate-scale-in hover-lift cursor-pointer transition-all-smooth bg-white"
                            >
                              <div className="flex items-center justify-between mb-1 sm:mb-2">
                                <span className="font-medium text-[#2dd4bf] text-sm">{appointment.zeit}</span>
                                <span className={`px-1 sm:px-2 py-1 rounded-full text-xs font-medium border ${
                                  appointment.status === 'bestätigt' ? 'bg-green-100 text-green-800 border-green-200' :
                                  appointment.status === 'ausstehend' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                  'bg-gray-100 text-gray-800 border-gray-200'
                                }`}>
                                  {appointment.status}
                                </span>
                              </div>
                              <h4 className="font-semibold text-xs sm:text-sm">{appointment.kunde}</h4>
                              <div className={`inline-block px-1 sm:px-2 py-1 rounded-full text-xs font-medium mt-1 ${getMitarbeiterColor(appointment.mitarbeiter)}`}>
                                {appointment.mitarbeiter.split(' ')[0]}
                              </div>
                              <p className="text-xs text-gray-600 mt-1 hidden sm:block">{appointment.service}</p>
                              <p className="text-xs text-gray-500 hidden sm:block">{appointment.dauer} • {appointment.adresse.split(',')[0]}</p>
                            </div>
                          ))
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        <Card className="hover-lift">
          <CardContent className="pt-4 sm:pt-6 text-center">
            <div className="text-xl sm:text-2xl font-bold text-[#2dd4bf]">{appointments.length}</div>
            <p className="text-xs sm:text-sm text-gray-600">Termine gesamt</p>
          </CardContent>
        </Card>
        <Card className="hover-lift">
          <CardContent className="pt-4 sm:pt-6 text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-600">
              {appointments.filter(a => a.status === 'bestätigt').length}
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Bestätigt</p>
          </CardContent>
        </Card>
        <Card className="hover-lift">
          <CardContent className="pt-4 sm:pt-6 text-center">
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">
              {appointments.filter(a => a.status === 'ausstehend').length}
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Ausstehend</p>
          </CardContent>
        </Card>
        <Card className="hover-lift">
          <CardContent className="pt-4 sm:pt-6 text-center">
            <div className="text-xl sm:text-2xl font-bold text-purple-600">
              {new Set(appointments.map(a => a.mitarbeiter)).size}
            </div>
            <p className="text-xs sm:text-sm text-gray-600">Aktive Mitarbeiter</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}