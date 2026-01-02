
import React, { useState } from 'react';
import { 
  Users, AlertTriangle, PhoneCall, Droplet, 
  Check, X, Eye, Trash2, ShieldAlert 
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'ALERTS' | 'SERVICES' | 'DONORS'>('ALERTS');

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldAlert className="text-blue-600" />
            Admin Command Center
          </h1>
          <p className="text-gray-500">Platform oversight and emergency management</p>
        </div>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          <button 
            onClick={() => setActiveView('ALERTS')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeView === 'ALERTS' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            SOS Alerts
          </button>
          <button 
            onClick={() => setActiveView('SERVICES')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeView === 'SERVICES' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Services
          </button>
          <button 
            onClick={() => setActiveView('DONORS')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeView === 'DONORS' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Donors
          </button>
        </div>
      </header>

      {/* SOS Alerts View */}
      {activeView === 'ALERTS' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <AlertTriangle className="text-red-600" size={20} />
              Recent SOS Signals
            </h3>
            <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full animate-pulse">
              LIVE MONITORING
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Location (Lat, Lng)</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[1, 2, 3].map(i => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">User_{i}00</td>
                    <td className="px-6 py-4 font-mono text-sm text-gray-500">40.7128, -74.0060</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{i} min ago</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold rounded-full uppercase">Pending</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Eye size={18} /></button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"><Check size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Services Management View */}
      {activeView === 'SERVICES' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button className="h-48 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all">
            <div className="p-3 bg-gray-50 rounded-full">
              <ShieldAlert size={24} />
            </div>
            <span className="font-bold">Add New Service</span>
          </button>
          {[1, 2].map(i => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <PhoneCall size={20} />
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Police Station #{i}</h4>
                <p className="text-sm text-gray-500">Zone {i}, Metropolis</p>
              </div>
              <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-bold text-gray-400">
                <span>VERIFIED</span>
                <span className="text-green-500">ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Donor Approval View */}
      {activeView === 'DONORS' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Droplet className="text-red-600" size={20} />
              Donor Applications
            </h3>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-red-600 border border-gray-100 shadow-sm">
                    {i % 2 === 0 ? 'O+' : 'A-'}
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Applicant Name {i}</h5>
                    <p className="text-xs text-gray-500">Registered 2 days ago • Metropolis</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"><Check size={18} /></button>
                  <button className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"><X size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
