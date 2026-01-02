
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Shield, Activity, Flame, Loader2, X, CheckCircle } from 'lucide-react';
import { EmergencyContact } from '../types';
import api from '../services/api';

const EmergencyServices: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [selectedContact, setSelectedContact] = useState<EmergencyContact | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get('/emergency-services');
        setContacts(response.data);
      } catch (err) {
        console.error('Failed to fetch emergency contacts');
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const filtered = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.locality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || c.type === filterType;
    return matchesSearch && matchesType;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'POLICE': return <Shield size={20} className="text-blue-600" />;
      case 'AMBULANCE': return <Activity size={20} className="text-red-600" />;
      case 'FIRE': return <Flame size={20} className="text-orange-600" />;
      default: return <Activity size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Emergency Services</h1>
        <p className="text-gray-500">Verified local responders available 24/7</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or locality..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {['ALL', 'POLICE', 'AMBULANCE', 'FIRE'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === type ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type}
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
          {filtered.map((contact) => (
            <div key={contact.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">{getIcon(contact.type)}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{contact.name}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full uppercase">
                      {contact.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                  <MapPin size={14} /> {contact.locality}, {contact.city}
                </p>
                <button
                  onClick={() => setSelectedContact(contact)}
                  className="w-full py-2 bg-blue-50 text-blue-700 rounded-lg font-bold hover:bg-blue-100 transition-colors"
                >
                  View Contact Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl relative">
            <button onClick={() => setSelectedContact(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-blue-50 rounded-full text-blue-600">
                {getIcon(selectedContact.type)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedContact.name}</h3>
                <div className="flex items-center justify-center gap-1 text-green-600 text-sm font-semibold mt-1">
                  <CheckCircle size={14} /> Verified Service
                </div>
              </div>
              <div className="w-full bg-gray-50 p-4 rounded-xl text-left space-y-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Emergency Line</label>
                  <p className="text-xl font-bold text-blue-600">{selectedContact.phone}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Location</label>
                  <p className="text-gray-700">{selectedContact.address}, {selectedContact.locality}</p>
                </div>
              </div>
              <a
                href={`tel:${selectedContact.phone}`}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all text-center"
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
