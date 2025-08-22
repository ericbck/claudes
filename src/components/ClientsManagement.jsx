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
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kundenverwaltung</h1>
          <p className="text-gray-600 mt-1">Verwalten Sie Ihre Kunden und deren Informationen</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#2dd4bf] hover:bg-[#26c2ab] transition-all-smooth"
        >
          {showAddForm ? '✕ Abbrechen' : '+ Neuer Kunde'}
        </Button>
      </div>

      {/* Add/Edit Client Form */}
      {showAddForm && (
        <Card className="animate-slide-up hover-lift">
          <CardHeader>
            <CardTitle className="text-[#2dd4bf]">{editingClient ? 'Kunde bearbeiten' : 'Neuen Kunden hinzufügen'}</CardTitle>
            <CardDescription>Geben Sie die Kundeninformationen ein</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={editingClient ? handleUpdateClient : handleAddClient} className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Vollständiger Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="serviceType">Service-Art</Label>
                <Input
                  id="serviceType"
                  value={formData.serviceType}
                  onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                  placeholder="z.B. Grundreinigung, Tiefenreinigung"
                  required
                  className="transition-all-smooth focus:ring-[#2dd4bf]"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="frequency">Häufigkeit</Label>
                <Input
                  id="frequency"
                  value={formData.frequency}
                  onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                  placeholder="z.B. Wöchentlich, Monatlich"
                  required
                  className="transition-all-smooth focus:ring-[#2dd4bf]"
                />
              </div>
              <div>
                <Label htmlFor="notes">Notizen</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Besondere Anweisungen oder Notizen"
                  className="transition-all-smooth focus:ring-[#2dd4bf]"
                />
              </div>
              <div className="col-span-2 flex space-x-2">
                <Button type="submit" className="flex-1 bg-[#2dd4bf] hover:bg-[#26c2ab] transition-all-smooth">
                  {editingClient ? 'Kunde aktualisieren' : 'Kunde hinzufügen'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} className="transition-all-smooth">
                  Abbrechen
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Clients List */}
      <div className="grid gap-4">
        {clients.map((client) => (
          <Card key={client.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-600">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.email}</p>
                      <p className="text-sm text-gray-600">{client.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm"><span className="font-medium">Service:</span> {client.serviceType}</p>
                      <p className="text-sm"><span className="font-medium">Frequency:</span> {client.frequency}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm"><span className="font-medium">Address:</span> {client.address}</p>
                    {client.notes && (
                      <p className="text-sm mt-1"><span className="font-medium">Notes:</span> {client.notes}</p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => handleEditClient(client)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteClient(client.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {clients.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-gray-500">No clients found. Add your first client to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}