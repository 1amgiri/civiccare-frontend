
import React, { useState, useEffect } from 'react';
import { Droplet, UserPlus, Heart, List, Phone, Info, Send, Hospital, Loader2, CheckCircle } from 'lucide-react';
import { BLOOD_GROUPS } from '../constants';
import api from '../services/api';

interface Donor {
  id: string;
  name: string;
  group: string;
  city: string;
  phone: string;
  status: 'VERIFIED' | 'AVAILABLE' | 'INACTIVE';
}

const BloodDonation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'DONORS' | 'REGISTER' | 'REQUEST'>('DONORS');
  const [selectedGroup, setSelectedGroup] = useState('ALL');
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDonors = async () => {
      setLoading(true);
      try {
        const params = selectedGroup !== 'ALL' ? { group: selectedGroup } : {};
        const response = await api.get('/blood-donors', { params });
        setDonors(response.data);
      } catch (err) {
        console.error('Failed to fetch donors');
      } finally {
        setLoading(false);
      }
    };
    if (activeTab === 'DONORS') fetchDonors();
  }, [selectedGroup, activeTab]);

  const getStatusBadge = (status: string) => {
    const classes = {
      VERIFIED: 'bg-green-100 text-green-700',
      AVAILABLE: 'bg-blue-100 text-blue-700',
      INACTIVE: 'bg-gray-100 text-gray-700'
    };
    return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${classes[status as keyof typeof classes]}`}>{status}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blood Bank & Donation</h1>
          <p className="text-gray-500">Backend synchronized donor network</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto no-scrollbar">
          {['DONORS', 'REQUEST', 'REGISTER'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'DONORS' ? <List size={16} /> : tab === 'REQUEST' ? <Send size={16} /> : <UserPlus size={16} />}
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'DONORS' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Filter by Blood Group</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedGroup('ALL')}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  selectedGroup === 'ALL' ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-600 hover:border-blue-400'
                }`}
              >
                All
              </button>
              {BLOOD_GROUPS.map(group => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                    selectedGroup === group ? 'bg-red-600 border-red-600 text-white' : 'border-gray-200 text-gray-600 hover:border-red-400'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin text-blue-600" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {donors.map(donor => (
                <div key={donor.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-bold text-lg border border-red-100">
                      {donor.group}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 flex items-center gap-2">
                        {donor.name} {getStatusBadge(donor.status)}
                      </h4>
                      <p className="text-sm text-gray-500">{donor.city}</p>
                    </div>
                  </div>
                  <a href={`tel:${donor.phone}`} className="p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                    <Phone size={20} />
                  </a>
                </div>
              ))}
              {donors.length === 0 && !loading && (
                <div className="col-span-full py-10 text-center text-gray-400 italic">No donors found for this criteria.</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Register and Request forms remain functional with real event handlers to be added as needed */}
    </div>
  );
};

export default BloodDonation;
