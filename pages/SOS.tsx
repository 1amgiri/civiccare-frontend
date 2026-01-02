
import React, { useState } from 'react';
import { AlertTriangle, MapPin, Send, ShieldCheck, Loader2, Clock } from 'lucide-react';
import api from '../services/api';

const SOS: React.FC = () => {
  const [isTriggering, setIsTriggering] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [response, setResponse] = useState<{ timestamp: string; id: string } | null>(null);

  const handleSOS = () => {
    setIsTriggering(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const res = await api.post('/sos', {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
            setResponse(res.data);
          } catch (err) {
            alert('Failed to send SOS signal. Check network connection.');
          } finally {
            setIsTriggering(false);
          }
        },
        (err) => {
          alert('Location access is required for SOS. Please enable it in browser settings.');
          setIsTriggering(false);
        }
      );
    }
  };

  if (response) {
    return (
      <div className="max-w-xl mx-auto text-center space-y-6 py-12">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-50">
          <ShieldCheck size={48} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">SOS Signal Received</h2>
          <p className="text-gray-600 mt-2">Emergency responders have been alerted.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-50">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Alert ID</span>
            <span className="font-mono text-sm bg-gray-50 px-2 py-1 rounded">#{response.id}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Clock className="text-blue-500" size={18} />
            <span className="text-sm">Server Log Timestamp: <strong>{new Date(response.timestamp).toLocaleString()}</strong></span>
          </div>
        </div>
        <button 
          onClick={() => setResponse(null)}
          className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Emergency SOS</h1>
        <p className="text-gray-500 max-w-md">Immediate alert to police and medical responders.</p>
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
        <button
          onClick={() => setShowConfirmation(true)}
          disabled={isTriggering}
          className={`relative z-10 w-64 h-64 rounded-full flex flex-col items-center justify-center gap-2 shadow-2xl transition-transform active:scale-95 ${
            isTriggering ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
          } text-white`}
        >
          {isTriggering ? <Loader2 className="animate-spin" size={64} /> : <AlertTriangle size={64} />}
          <span className="text-2xl font-bold tracking-widest">{isTriggering ? 'SENDING...' : 'SOS'}</span>
        </button>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Trigger SOS?</h3>
            <p className="text-gray-600 mb-8">This action is logged. Dispatchers will see your exact GPS coordinates.</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => { setShowConfirmation(false); handleSOS(); }}
                className="w-full py-4 bg-red-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2"
              >
                <Send size={20} /> Confirm and Alert
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full py-4 bg-gray-100 text-gray-900 font-bold rounded-2xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SOS;
