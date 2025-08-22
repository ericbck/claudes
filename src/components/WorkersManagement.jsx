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
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mitarbeiterverwaltung</h1>
          <p className="text-gray-600 mt-1">Verwalten Sie Ihr Reinigungsteam</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#2dd4bf] hover:bg-[#26c2ab] transition-all-smooth"
        >
          {showAddForm ? '✕ Abbrechen' : '+ Neuer Mitarbeiter'}
        </Button>
      </div>

      {/* Add/Edit Worker Form */}
      {showAddForm && (
        <Card className="animate-slide-up hover-lift">
          <CardHeader>
            <CardTitle className="text-[#2dd4bf]">{editingWorker ? 'Mitarbeiter bearbeiten' : 'Neuen Mitarbeiter hinzufügen'}</CardTitle>
            <CardDescription>Geben Sie die Mitarbeiterinformationen ein</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={editingWorker ? handleUpdateWorker : handleAddWorker} className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Vollständiger Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Name des Mitarbeiters"
                  required
                  className="transition-all-smooth focus:ring-[#2dd4bf]"
                />
              </div>
              <div>
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="E-Mail-Adresse"
                  required
                  className="transition-all-smooth focus:ring-[#2dd4bf]"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="Telefonnummer"
                  required
                  className="transition-all-smooth focus:ring-[#2dd4bf]"
                />
              </div>
              <div>
                <Label htmlFor="hourlyRate">Stundenlohn (€)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  step="0.50"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                  placeholder="Stundenlohn"
                  required
                  className="transition-all-smooth focus:ring-[#2dd4bf]"
                />
              </div>
              <div>
                <Label htmlFor="specialties">Spezialisierungen</Label>
                <Input
                  id="specialties"
                  value={formData.specialties}
                  onChange={(e) => setFormData({...formData, specialties: e.target.value})}
                  placeholder="z.B. Grundreinigung, Tiefenreinigung"
                  required
                  className="transition-all-smooth focus:ring-[#2dd4bf]"
                />
              </div>
              <div>
                <Label htmlFor="availability">Verfügbarkeit</Label>
                <Input
                  id="availability"
                  value={formData.availability}
                  onChange={(e) => setFormData({...formData, availability: e.target.value})}
                  placeholder="z.B. Montag-Freitag, Wochenende"
                  required
                  className="transition-all-smooth focus:ring-[#2dd4bf]"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="notes">Notizen</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Zusätzliche Informationen über den Mitarbeiter"
                  className="transition-all-smooth focus:ring-[#2dd4bf]"
                />
              </div>
              <div className="col-span-2 flex space-x-2">
                <Button type="submit" className="flex-1 bg-[#2dd4bf] hover:bg-[#26c2ab] transition-all-smooth">
                  {editingWorker ? 'Mitarbeiter aktualisieren' : 'Mitarbeiter hinzufügen'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} className="transition-all-smooth">
                  Abbrechen
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Workers List */}
      <div className="grid gap-4">
        {workers.map((worker) => (
          <Card key={worker.id} className="hover-lift transition-all-smooth">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#2dd4bf]">{worker.name}</h3>
                      <p className="text-sm text-gray-600">{worker.email}</p>
                      <p className="text-sm text-gray-600">{worker.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm"><span className="font-medium">Stundenlohn:</span> €{worker.hourlyRate}/Std</p>
                      <p className="text-sm"><span className="font-medium">Verfügbarkeit:</span> {worker.availability}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm"><span className="font-medium">Spezialisierungen:</span> {worker.specialties}</p>
                    {worker.notes && (
                      <p className="text-sm mt-1"><span className="font-medium">Notizen:</span> {worker.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEditWorker(worker)}
                    className="transition-all-smooth hover:border-[#2dd4bf] hover:text-[#2dd4bf]"
                  >
                    Bearbeiten
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDeleteWorker(worker.id)}
                    className="transition-all-smooth"
                  >
                    Löschen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {workers.length === 0 && (
        <Card className="hover-lift">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-500">Keine Mitarbeiter gefunden. Fügen Sie Ihren ersten Mitarbeiter hinzu, um zu beginnen.</p>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="hover-lift">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-[#2dd4bf]">{workers.length}</div>
            <p className="text-sm text-gray-600">Mitarbeiter gesamt</p>
          </CardContent>
        </Card>
        <Card className="hover-lift">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              €{workers.length > 0 ? (workers.reduce((sum, w) => sum + parseFloat(w.hourlyRate), 0) / workers.length).toFixed(2) : '0.00'}
            </div>
            <p className="text-sm text-gray-600">Durchschnittlicher Stundenlohn</p>
          </CardContent>
        </Card>
        <Card className="hover-lift">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {workers.filter(w => w.availability.includes('Montag')).length}
            </div>
            <p className="text-sm text-gray-600">Verfügbar montags</p>
          </CardContent>
        </Card>
        <Card className="hover-lift">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {workers.filter(w => w.specialties.includes('Tiefenreinigung')).length}
            </div>
            <p className="text-sm text-gray-600">Tiefenreinigung-Spezialisten</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}