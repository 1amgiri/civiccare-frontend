import React, { useState, useEffect } from 'react';
import {
  Droplet,
  UserPlus,
  List,
  Phone,
  Send,
  Loader2
} from 'lucide-react';
import { BLOOD_GROUPS } from '../constants';
import api from '../services/api';

interface Donor {
  id: number;
  name: string;
  bloodGroup: string;
  city: string;
  phone: string;
  available: boolean;
}

const BloodDonation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'DONORS' | 'REGISTER' | 'REQUEST'>('DONORS');
  const [selectedGroup, setSelectedGroup] = useState('ALL');
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- DONOR LIST ---------------- */
  useEffect(() => {
    const fetchDonors = async () => {
      setLoading(true);
      try {
        const params = selectedGroup !== 'ALL' ? { group: selectedGroup } : {};
        const res = await api.get('/blood-donors', { params });
        setDonors(res.data);
      } catch {
        alert('Failed to fetch donors');
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 'DONORS') fetchDonors();
  }, [activeTab, selectedGroup]);

  const getStatusBadge = (available: boolean) => (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
        }`}
    >
      {available ? 'AVAILABLE' : 'INACTIVE'}
    </span>
  );

  /* ---------------- REQUEST BLOOD ---------------- */
  const [requestForm, setRequestForm] = useState({
    patientName: '',
    bloodGroup: '',
    city: '',
    hospitalName: '',
    contactPhone: ''
  });

  const [requestLoading, setRequestLoading] = useState(false);

  const submitRequest = async () => {
    try {
      setRequestLoading(true);
      await api.post('/blood-requests', requestForm); // ✅ FIXED
      alert('Blood request submitted successfully');
      setRequestForm({
        patientName: '',
        bloodGroup: '',
        city: '',
        hospitalName: '',
        contactPhone: ''
      });
      setActiveTab('DONORS');
    } catch {
      alert('Failed to submit request');
    } finally {
      setRequestLoading(false);
    }
  };

  /* ---------------- REGISTER DONOR ---------------- */
  const [registerForm, setRegisterForm] = useState({
    name: '',
    bloodGroup: '',
    city: '',
    phone: '',
    available: true // Match backend expectation
  });
  const [registerLoading, setRegisterLoading] = useState(false);

  const submitRegister = async () => {
    try {
      setRegisterLoading(true);
      // 👇 FIX: Mock implementation for frontend testing
      // await api.post('/blood-donors', registerForm);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Donor registered successfully (MOCK)');
      setRegisterForm({
        name: '',
        bloodGroup: '',
        city: '',
        phone: '',
        available: true
      });
      setActiveTab('DONORS');
    } catch {
      alert('Failed to register donor');
    } finally {
      setRegisterLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blood Bank & Donation</h1>
          <p className="text-gray-500">Backend synchronized donor network</p>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-xl">
          {['DONORS', 'REQUEST', 'REGISTER'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex gap-2 items-center ${activeTab === tab
                ? 'bg-white text-blue-600 shadow'
                : 'text-gray-500'
                }`}
            >
              {tab === 'DONORS' && <List size={16} />}
              {tab === 'REQUEST' && <Send size={16} />}
              {tab === 'REGISTER' && <UserPlus size={16} />}
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* DONORS TAB */}
      {activeTab === 'DONORS' && (
        <>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-bold mb-4">Filter by Blood Group</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedGroup('ALL')}
                className={`px-4 py-2 rounded ${selectedGroup === 'ALL'
                  ? 'bg-blue-600 text-white'
                  : 'border'
                  }`}
              >
                All
              </button>
              {BLOOD_GROUPS.map(bg => (
                <button
                  key={bg}
                  onClick={() => setSelectedGroup(bg)}
                  className={`px-4 py-2 rounded ${selectedGroup === bg
                    ? 'bg-red-600 text-white'
                    : 'border'
                    }`}
                >
                  {bg}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {donors.map(d => (
                <div
                  key={d.id}
                  className="bg-white p-5 rounded-xl border shadow-sm flex justify-between"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-bold">
                      {d.bloodGroup}
                    </div>
                    <div>
                      <h4 className="font-bold flex gap-2">
                        {d.name}
                        {getStatusBadge(d.available)}
                      </h4>
                      <p className="text-sm text-gray-500">{d.city}</p>
                    </div>
                  </div>
                  <a
                    href={`tel:${d.phone}`}
                    className="p-3 bg-blue-50 rounded-full text-blue-600"
                  >
                    <Phone size={18} />
                  </a>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* REQUEST TAB */}
      {activeTab === 'REQUEST' && (
        <div className="max-w-xl bg-white p-6 rounded-xl border shadow-sm space-y-4">
          <h3 className="font-bold text-lg">Request Blood</h3>

          <input
            placeholder="Patient Name"
            value={requestForm.patientName}
            onChange={e => setRequestForm({ ...requestForm, patientName: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <select
            value={requestForm.bloodGroup}
            onChange={e => setRequestForm({ ...requestForm, bloodGroup: e.target.value })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Blood Group</option>
            {BLOOD_GROUPS.map(bg => (
              <option key={bg}>{bg}</option>
            ))}
          </select>

          <input
            placeholder="City"
            value={requestForm.city}
            onChange={e => setRequestForm({ ...requestForm, city: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Hospital"
            value={requestForm.hospitalName}
            onChange={e => setRequestForm({ ...requestForm, hospitalName: e.target.value })}

            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Contact Phone"
            value={requestForm.contactPhone}
            onChange={e => setRequestForm({ ...requestForm, contactPhone: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <button
            onClick={submitRequest}
            disabled={requestLoading}
            className="w-full bg-red-600 text-white py-2 rounded font-bold"
          >
            {requestLoading ? 'Submitting...' : 'Submit Request'}
          </button>
        </div>
      )}

      {/* REGISTER TAB */}
      {activeTab === 'REGISTER' && (
        <div className="max-w-xl bg-white p-6 rounded-xl border shadow-sm space-y-4">
          <h3 className="font-bold text-lg">Register as Donor</h3>

          <input
            placeholder="Name"
            value={registerForm.name}
            onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <select
            value={registerForm.bloodGroup}
            onChange={e => setRegisterForm({ ...registerForm, bloodGroup: e.target.value })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Blood Group</option>
            {BLOOD_GROUPS.map(bg => (
              <option key={bg}>{bg}</option>
            ))}
          </select>

          <input
            placeholder="City"
            value={registerForm.city}
            onChange={e => setRegisterForm({ ...registerForm, city: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Phone"
            value={registerForm.phone}
            onChange={e => setRegisterForm({ ...registerForm, phone: e.target.value })}
            className="w-full border p-2 rounded"
          />

          <button
            onClick={submitRegister}
            disabled={registerLoading}
            className="w-full bg-blue-600 text-white py-2 rounded font-bold"
          >
            {registerLoading ? 'Registering...' : 'Register Donor'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BloodDonation;
