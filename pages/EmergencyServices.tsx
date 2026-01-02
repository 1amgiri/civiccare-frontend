import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Shield,
  Activity,
  Flame,
  Loader2,
  X,
  CheckCircle
} from 'lucide-react';
import api from '../services/api';

interface EmergencyContact {
  id: number;
  name: string;
  city: string;
  phone: string;
  verified: boolean;
  type: 'POLICE' | 'AMBULANCE' | 'FIRE';
}

const detectType = (name: string): EmergencyContact['type'] => {
  const n = name.toLowerCase();
  if (n.includes('police')) return 'POLICE';
  if (n.includes('ambulance')) return 'AMBULANCE';
  if (n.includes('fire')) return 'FIRE';
  return 'AMBULANCE';
};

const EmergencyServices: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | EmergencyContact['type']>('ALL');
  const [selectedContact, setSelectedContact] = useState<EmergencyContact | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get('/emergency-services');

        // 🔥 MAP BACKEND → FRONTEND MODEL
        const mapped = res.data.map((s: any) => ({
          id: s.id,
          name: s.name,
          city: s.city,
          phone: s.phone,
          verified: s.verified,
          type: detectType(s.name)
        }));

        setContacts(mapped);
      } catch (err) {
        console.error('Failed to fetch emergency services', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const filtered = contacts.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'ALL' || c.type === filterType;
    return matchesSearch && matchesType;
  });

  const getIcon = (type: EmergencyContact['type']) => {
    switch (type) {
      case 'POLICE':
        return <Shield size={20} className="text-blue-600" />;
      case 'AMBULANCE':
        return <Activity size={20} className="text-red-600" />;
      case 'FIRE':
        return <Flame size={20} className="text-orange-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Emergency Services</h1>
        <p className="text-gray-500">Verified local responders available 24/7</p>
      </div>

      <div className="bg-white p-4 rounded-xl border flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or city..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-lg"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {['ALL', 'POLICE', 'AMBULANCE', 'FIRE'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filterType === t
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(contact => (
            <div key={contact.id} className="bg-white rounded-xl border shadow-sm">
              <div className="p-5 flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {getIcon(contact.type)}
                  </div>
                  <div>
                    <h3 className="font-bold">{contact.name}</h3>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                      {contact.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-600 flex items-center gap-2 mb-4">
                  <MapPin size={14} /> {contact.city}
                </p>
                <button
                  onClick={() => setSelectedContact(contact)}
                  className="w-full py-2 bg-blue-50 text-blue-700 rounded-lg font-bold"
                >
                  View Contact Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setSelectedContact(null)}
              className="absolute top-4 right-4 text-gray-400"
            >
              <X size={24} />
            </button>

            <div className="text-center space-y-4">
              <div className="p-4 bg-blue-50 rounded-full inline-block">
                {getIcon(selectedContact.type)}
              </div>

              <h3 className="text-2xl font-bold">{selectedContact.name}</h3>

              <div className="flex justify-center gap-1 text-green-600 text-sm font-semibold">
                <CheckCircle size={14} /> Verified Service
              </div>

              <div className="bg-gray-50 p-4 rounded-xl text-left space-y-3">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400">
                    Emergency Line
                  </label>
                  <p className="text-xl font-bold text-blue-600">
                    {selectedContact.phone}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-400">
                    Location
                  </label>
                  <p>{selectedContact.city}</p>
                </div>
              </div>

              <a
                href={`tel:${selectedContact.phone}`}
                className="block w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyServices;
