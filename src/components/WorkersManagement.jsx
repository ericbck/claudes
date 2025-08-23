import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function WorkersManagement() {
  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: 'Anna Müller',
      email: 'anna.mueller@email.com',
      phone: '+49 30 55566677',
      specialties: 'Grundreinigung, Fensterreinigung',
      hourlyRate: '15.00',
      availability: 'Montag-Freitag',
      notes: 'Erfahrene Reinigungskraft, spricht Deutsch und Englisch'
    },
    {
      id: 2,
      name: 'Klaus Fischer',
      email: 'klaus.fischer@email.com',
      phone: '+49 89 99887766',
      specialties: 'Tiefenreinigung, Teppichreinigung',
      hourlyRate: '18.00',
      availability: 'Dienstag-Samstag',
      notes: 'Spezialist für Tiefenreinigung und Desinfektion'
    },
    {
      id: 3,
      name: 'Sophie Wagner',
      email: 'sophie.wagner@email.com',
      phone: '+49 40 44556688',
      specialties: 'Büroreinigung, Fensterreinigung',
      hourlyRate: '16.50',
      availability: 'Flexible Arbeitszeiten',
      notes: 'Bevorzugt Gewerbereiniung, sehr zuverlässig'
    },
    {
      id: 4,
      name: 'Michael Braun',
      email: 'michael.braun@email.com',
      phone: '+49 221 33445566',
      specialties: 'Industriereinigung, Fassadenreinigung',
      hourlyRate: '20.00',
      availability: 'Wochenende',
      notes: 'Spezialist für große Industrieanlagen'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingWorker, setEditingWorker] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialties: '',
    hourlyRate: '',
    availability: '',
    notes: ''
  })

  const handleAddWorker = (e) => {
    e.preventDefault()
    const newWorker = {
      id: Date.now(),
      ...formData
    }
    setWorkers([...workers, newWorker])
    resetForm()
  }

  const handleEditWorker = (worker) => {
    setEditingWorker(worker.id)
    setFormData(worker)
    setShowAddForm(true)
  }

  const handleUpdateWorker = (e) => {
    e.preventDefault()
    setWorkers(workers.map(worker => 
      worker.id === editingWorker ? { ...formData, id: editingWorker } : worker
    ))
    resetForm()
  }

  const handleDeleteWorker = (id) => {
    if (confirm('Sind Sie sicher, dass Sie diesen Mitarbeiter löschen möchten?')) {
      setWorkers(workers.filter(worker => worker.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', specialties: '', hourlyRate: '', availability: '', notes: '' })
    setShowAddForm(false)
    setEditingWorker(null)
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Mitarbeiterverwaltung</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">Verwalten Sie Ihr Reinigungsteam</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary w-full sm:w-auto touch-manipulation btn-touch"
        >
          <span className="hidden sm:inline">{showAddForm ? '✕ Abbrechen' : '+ Neuer Mitarbeiter'}</span>
          <span className="sm:hidden">{showAddForm ? '✕' : '+ Team'}</span>
        </Button>
      </div>

      {/* Add/Edit Worker Form */}
      {showAddForm && (
        <Card className="animate-slide-up hover-lift card-primary">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-brand-primary text-lg sm:text-xl">
              {editingWorker ? 'Mitarbeiter bearbeiten' : 'Neuen Mitarbeiter hinzufügen'}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm sm:text-base">
              Geben Sie die Mitarbeiterinformationen ein
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={editingWorker ? handleUpdateWorker : handleAddWorker} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">Vollständiger Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Anna Müller"
                  required
                  className="input-primary h-10 sm:h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="anna@email.de"
                  required
                  className="input-primary h-10 sm:h-12"
                  inputMode="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">Telefon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+49 30 12345678"
                  required
                  className="input-primary h-10 sm:h-12"
                  inputMode="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hourlyRate" className="text-sm font-medium text-foreground">Stundenlohn (€)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  step="0.50"
                  min="0"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                  placeholder="15.00"
                  required
                  className="input-primary h-10 sm:h-12"
                  inputMode="decimal"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialties" className="text-sm font-medium text-foreground">Spezialisierungen</Label>
                <Input
                  id="specialties"
                  value={formData.specialties}
                  onChange={(e) => setFormData({...formData, specialties: e.target.value})}
                  placeholder="Grundreinigung, Fenster"
                  required
                  className="input-primary h-10 sm:h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability" className="text-sm font-medium text-foreground">Verfügbarkeit</Label>
                <Input
                  id="availability"
                  value={formData.availability}
                  onChange={(e) => setFormData({...formData, availability: e.target.value})}
                  placeholder="Montag-Freitag"
                  required
                  className="input-primary h-10 sm:h-12"
                />
              </div>
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium text-foreground">Notizen</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Zusätzliche Informationen"
                  className="input-primary h-10 sm:h-12"
                />
              </div>
              <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button type="submit" className="flex-1 btn-primary h-10 sm:h-12 touch-manipulation">
                  <span className="hidden sm:inline">{editingWorker ? 'Mitarbeiter aktualisieren' : 'Mitarbeiter hinzufügen'}</span>
                  <span className="sm:hidden">{editingWorker ? 'Aktualisieren' : 'Hinzufügen'}</span>
                </Button>
                <Button type="button" onClick={resetForm} className="btn-secondary h-10 sm:h-12 touch-manipulation">
                  Abbrechen
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Workers List */}
      <div className="grid gap-3 sm:gap-4">
        {workers.map((worker) => (
          <Card key={worker.id} className="hover-lift card-primary">
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                {/* Mobile: Stacked layout, Desktop: Side by side */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
                  <div className="flex-1 min-w-0">
                    {/* Header Info */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0 mb-3">
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-semibold text-brand-primary truncate">{worker.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-muted-foreground">
                          <span className="truncate">{worker.email}</span>
                          <span>{worker.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-lg sm:text-xl font-bold text-success">€{worker.hourlyRate}</span>
                        <span className="text-xs sm:text-sm text-muted-foreground">/Std</span>
                      </div>
                    </div>
                    
                    {/* Worker Info - Mobile friendly grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                      <div className="space-y-1">
                        <p><span className="font-medium text-foreground">Spezialisierungen:</span> <span className="text-muted-foreground">{worker.specialties}</span></p>
                        <p><span className="font-medium text-foreground">Verfügbarkeit:</span> <span className="text-muted-foreground">{worker.availability}</span></p>
                      </div>
                      <div className="space-y-1">
                        {worker.notes && (
                          <p><span className="font-medium text-foreground">Notizen:</span> <span className="text-muted-foreground">{worker.notes}</span></p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons - Mobile: Full width, Desktop: Right aligned */}
                  <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 lg:ml-4 flex-shrink-0">
                    <Button 
                      onClick={() => handleEditWorker(worker)}
                      className="flex-1 lg:flex-initial btn-secondary h-9 sm:h-10 text-xs sm:text-sm touch-manipulation"
                      size="sm"
                    >
                      <span className="hidden sm:inline">Bearbeiten</span>
                      <span className="sm:hidden">✏️</span>
                    </Button>
                    <Button 
                      onClick={() => handleDeleteWorker(worker.id)}
                      className="flex-1 lg:flex-initial h-9 sm:h-10 text-xs sm:text-sm touch-manipulation"
                      style={{backgroundColor: 'hsl(var(--status-error))', color: 'white'}}
                      size="sm"
                    >
                      <span className="hidden sm:inline">Löschen</span>
                      <span className="sm:hidden">🗑️</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {workers.length === 0 && (
        <Card className="card-secondary">
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="space-y-3">
              <div className="text-4xl sm:text-5xl mb-4">🧹</div>
              <p className="text-muted-foreground text-sm sm:text-base">Noch kein Team vorhanden</p>
              <p className="text-muted-foreground text-xs sm:text-sm">Fügen Sie Ihren ersten Mitarbeiter hinzu, um zu beginnen.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="hover-lift card-primary">
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="text-xl sm:text-2xl font-bold text-brand-primary">{workers.length}</div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Mitarbeiter</p>
          </CardContent>
        </Card>
        <Card className="hover-lift card-primary">
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="text-xl sm:text-2xl font-bold text-success">
              €{workers.length > 0 ? (workers.reduce((sum, w) => sum + parseFloat(w.hourlyRate), 0) / workers.length).toFixed(2) : '0.00'}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Durchschn. Lohn</p>
          </CardContent>
        </Card>
        <Card className="hover-lift card-primary">
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="text-xl sm:text-2xl font-bold text-info">
              {workers.filter(w => w.availability.includes('Montag')).length}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Montags verfügbar</p>
          </CardContent>
        </Card>
        <Card className="hover-lift card-primary">
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="text-xl sm:text-2xl font-bold text-warning">
              {workers.filter(w => w.specialties.includes('Tiefenreinigung')).length}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Tiefenreinigung</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}