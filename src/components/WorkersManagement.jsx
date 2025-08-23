import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from '../lib/supabase'

export function WorkersManagement() {
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingWorker, setEditingWorker] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialities: '',
    hourlyRate: '',
    availability: '',
    notes: ''
  })

  // Fetch workers from Supabase
  const fetchWorkers = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('Sie müssen angemeldet sein, um auf die Mitarbeiterdaten zuzugreifen.')
      }
      
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('id', { ascending: false })
      
      if (error) {
        throw error
      }
      
      setWorkers(data || [])
    } catch (error) {
      console.error('Error fetching workers:', error)
      setError('Fehler beim Laden der Mitarbeiter: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  // Load workers on component mount
  useEffect(() => {
    fetchWorkers()
  }, [])

  const handleAddWorker = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      setError('')
      
      // Convert hourlyRate to number for database
      const workerData = {
        ...formData,
        hourlyRate: parseFloat(formData.hourlyRate) || 0
      }
      
      const { data, error } = await supabase
        .from('employees')
        .insert([workerData])
        .select()
      
      if (error) {
        throw error
      }
      
      // Add new worker to local state for immediate UI update
      if (data && data.length > 0) {
        setWorkers([data[0], ...workers])
      }
      
      resetForm()
    } catch (error) {
      console.error('Error adding worker:', error)
      setError('Fehler beim Hinzufügen des Mitarbeiters: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEditWorker = (worker) => {
    setEditingWorker(worker.id)
    setFormData(worker)
    setShowAddForm(true)
  }

  const handleUpdateWorker = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      setError('')
      
      // Convert hourlyRate to number for database
      const workerData = {
        ...formData,
        hourlyRate: parseFloat(formData.hourlyRate) || 0
      }
      
      const { data, error } = await supabase
        .from('employees')
        .update(workerData)
        .eq('id', editingWorker)
        .select()
      
      if (error) {
        throw error
      }
      
      // Update local state for immediate UI update
      if (data && data.length > 0) {
        setWorkers(workers.map(worker => 
          worker.id === editingWorker ? data[0] : worker
        ))
      }
      
      resetForm()
    } catch (error) {
      console.error('Error updating worker:', error)
      setError('Fehler beim Aktualisieren des Mitarbeiters: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteWorker = async (id) => {
    if (!confirm('Sind Sie sicher, dass Sie diesen Mitarbeiter löschen möchten?')) {
      return
    }
    
    try {
      setLoading(true)
      setError('')
      
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id)
      
      if (error) {
        throw error
      }
      
      // Remove worker from local state for immediate UI update
      setWorkers(workers.filter(worker => worker.id !== id))
      
    } catch (error) {
      console.error('Error deleting worker:', error)
      setError('Fehler beim Löschen des Mitarbeiters: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', specialities: '', hourlyRate: '', availability: '', notes: '' })
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
          <span className="sm:hidden">{showAddForm ? '✕' : '+ Mitarbeiter'}</span>
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
                  value={formData.specialities}
                  onChange={(e) => setFormData({...formData, specialities: e.target.value})}
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
                <Button type="submit" disabled={loading} className="flex-1 btn-primary h-10 sm:h-12 touch-manipulation disabled:opacity-50">
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span className="hidden sm:inline">Speichern...</span>
                      <span className="sm:hidden">...</span>
                    </div>
                  ) : (
                    <>
                      <span className="hidden sm:inline">{editingWorker ? 'Mitarbeiter aktualisieren' : 'Mitarbeiter hinzufügen'}</span>
                      <span className="sm:hidden">{editingWorker ? 'Aktualisieren' : 'Hinzufügen'}</span>
                    </>
                  )}
                </Button>
                <Button type="button" onClick={resetForm} className="btn-secondary h-10 sm:h-12 touch-manipulation">
                  Abbrechen
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Loading and Error States */}
      {loading && (
        <Card className="card-primary">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Lade Mitarbeiter...</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-l-4 border-l-red-500 card-primary">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start space-x-3">
              <div className="text-red-500 text-xl">⚠️</div>
              <div>
                <p className="font-medium text-red-700">Fehler</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
              </div>
            </div>
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
                        <p><span className="font-medium text-foreground">Spezialisierungen:</span> <span className="text-muted-foreground">{worker.specialities}</span></p>
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
                      disabled={loading}
                      className="flex-1 lg:flex-initial h-9 sm:h-10 text-xs sm:text-sm touch-manipulation disabled:opacity-50"
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
              {workers.filter(w => w.specialities.includes('Tiefenreinigung')).length}
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Tiefenreinigung</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}