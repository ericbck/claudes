import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ClientsManagement() {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Maria Schmidt',
      email: 'maria.schmidt@email.com',
      phone: '+49 30 12345678',
      address: 'Hauptstraße 15, 10115 Berlin',
      serviceType: 'Grundreinigung',
      frequency: 'Wöchentlich',
      notes: 'Hat eine Katze, benötigt besondere Aufmerksamkeit für Allergene'
    },
    {
      id: 2,
      name: 'Familie Weber',
      email: 'hans.weber@email.com',
      phone: '+49 89 87654321',
      address: 'Gartenstraße 8, 80331 München',
      serviceType: 'Tiefenreinigung',
      frequency: 'Monatlich',
      notes: 'Große Wohnung, 4 Zimmer'
    },
    {
      id: 3,
      name: 'Emma Bauer',
      email: 'emma.bauer@email.com',
      phone: '+49 40 11223344',
      address: 'Rosenweg 22, 20095 Hamburg',
      serviceType: 'Fensterreinigung',
      frequency: 'Alle zwei Wochen',
      notes: 'Erdgeschosswohnung mit großen Fenstern'
    },
    {
      id: 4,
      name: 'Thomas Huber',
      email: 'thomas.huber@email.com',
      phone: '+49 221 55566677',
      address: 'Kirchplatz 5, 50667 Köln',
      serviceType: 'Büroreinigung',
      frequency: 'Täglich',
      notes: 'Praxis mit Wartezimmer und 3 Behandlungsräumen'
    }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: '',
    frequency: '',
    notes: ''
  })

  const handleAddClient = (e) => {
    e.preventDefault()
    const newClient = {
      id: Date.now(),
      ...formData
    }
    setClients([...clients, newClient])
    resetForm()
  }

  const handleEditClient = (client) => {
    setEditingClient(client.id)
    setFormData(client)
    setShowAddForm(true)
  }

  const handleUpdateClient = (e) => {
    e.preventDefault()
    setClients(clients.map(client => 
      client.id === editingClient ? { ...formData, id: editingClient } : client
    ))
    resetForm()
  }

  const handleDeleteClient = (id) => {
    if (confirm('Sind Sie sicher, dass Sie diesen Kunden löschen möchten?')) {
      setClients(clients.filter(client => client.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', address: '', serviceType: '', frequency: '', notes: '' })
    setShowAddForm(false)
    setEditingClient(null)
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Kundenverwaltung</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">Verwalten Sie Ihre Kunden und deren Informationen</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary w-full sm:w-auto touch-manipulation btn-touch"
        >
          <span className="hidden sm:inline">{showAddForm ? '✕ Abbrechen' : '+ Neuer Kunde'}</span>
          <span className="sm:hidden">{showAddForm ? '✕' : '+ Kunde'}</span>
        </Button>
      </div>

      {/* Add/Edit Client Form */}
      {showAddForm && (
        <Card className="animate-slide-up hover-lift card-primary">
          <CardHeader className="px-4 sm:px-6">
            <CardTitle className="text-brand-primary text-lg sm:text-xl">
              {editingClient ? 'Kunde bearbeiten' : 'Neuen Kunden hinzufügen'}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm sm:text-base">
              Geben Sie die Kundeninformationen ein
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <form onSubmit={editingClient ? handleUpdateClient : handleAddClient} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">Vollständiger Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="input-primary h-10 sm:h-12"
                  placeholder="Max Mustermann"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="input-primary h-10 sm:h-12"
                  placeholder="max@email.de"
                  inputMode="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">Telefon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="input-primary h-10 sm:h-12"
                  placeholder="+49 30 12345678"
                  inputMode="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceType" className="text-sm font-medium text-foreground">Service-Art</Label>
                <Input
                  id="serviceType"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                  placeholder="z.B. Grundreinigung"
                  required
                  className="input-primary h-10 sm:h-12"
                />
              </div>
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <Label htmlFor="address" className="text-sm font-medium text-foreground">Adresse</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                  className="input-primary h-10 sm:h-12"
                  placeholder="Hauptstraße 15, 10115 Berlin"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency" className="text-sm font-medium text-foreground">Häufigkeit</Label>
                <Input
                  id="frequency"
                  value={formData.frequency}
                  onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                  placeholder="z.B. Wöchentlich"
                  required
                  className="input-primary h-10 sm:h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium text-foreground">Notizen</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Besondere Anweisungen"
                  className="input-primary h-10 sm:h-12"
                />
              </div>
              <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button type="submit" className="flex-1 btn-primary h-10 sm:h-12 touch-manipulation">
                  <span className="hidden sm:inline">{editingClient ? 'Kunde aktualisieren' : 'Kunde hinzufügen'}</span>
                  <span className="sm:hidden">{editingClient ? 'Aktualisieren' : 'Hinzufügen'}</span>
                </Button>
                <Button type="button" onClick={resetForm} className="btn-secondary h-10 sm:h-12 touch-manipulation">
                  Abbrechen
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Clients List */}
      <div className="grid gap-3 sm:gap-4">
        {clients.map((client) => (
          <Card key={client.id} className="hover-lift card-primary">
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                {/* Mobile: Stacked layout, Desktop: Side by side */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
                  <div className="flex-1 min-w-0">
                    {/* Header Info */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-2 sm:space-y-0 mb-3">
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-semibold text-brand-primary truncate">{client.name}</h3>
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-1 sm:space-y-0 text-sm text-muted-foreground">
                          <span className="truncate">{client.email}</span>
                          <span>{client.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Service Info - Mobile friendly grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                      <div className="space-y-1">
                        <p><span className="font-medium text-foreground">Service:</span> <span className="text-muted-foreground">{client.serviceType}</span></p>
                        <p><span className="font-medium text-foreground">Häufigkeit:</span> <span className="text-muted-foreground">{client.frequency}</span></p>
                      </div>
                      <div className="space-y-1">
                        <p><span className="font-medium text-foreground">Adresse:</span> <span className="text-muted-foreground">{client.address}</span></p>
                        {client.notes && (
                          <p><span className="font-medium text-foreground">Notizen:</span> <span className="text-muted-foreground">{client.notes}</span></p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons - Mobile: Full width, Desktop: Right aligned */}
                  <div className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 lg:ml-4 flex-shrink-0">
                    <Button 
                      onClick={() => handleEditClient(client)}
                      className="flex-1 lg:flex-initial btn-secondary h-9 sm:h-10 text-xs sm:text-sm touch-manipulation"
                      size="sm"
                    >
                      <span className="hidden sm:inline">Bearbeiten</span>
                      <span className="sm:hidden">✏️</span>
                    </Button>
                    <Button 
                      onClick={() => handleDeleteClient(client.id)}
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

      {clients.length === 0 && (
        <Card className="card-secondary">
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="space-y-3">
              <div className="text-4xl sm:text-5xl mb-4">👥</div>
              <p className="text-muted-foreground text-sm sm:text-base">Noch keine Kunden vorhanden</p>
              <p className="text-muted-foreground text-xs sm:text-sm">Fügen Sie Ihren ersten Kunden hinzu, um loszulegen.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}