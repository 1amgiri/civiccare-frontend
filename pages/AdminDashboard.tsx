import React, { useEffect, useState } from "react";
import {
  Users,
  AlertTriangle,
  PhoneCall,
  Droplet,
  Check,
  X,
  Eye,
  Trash2,
  ShieldAlert
} from "lucide-react";
import api from "../services/api";

type EmergencyService = {
  id: number;
  name: string;
  phone: string;
  city: string;
  verified: boolean;
};

const AdminDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<"ALERTS" | "SERVICES" | "DONORS">(
    "ALERTS"
  );

  const [services, setServices] = useState<EmergencyService[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);

  /* ============================
     FETCH EMERGENCY SERVICES
     ============================ */
  useEffect(() => {
    if (activeView === "SERVICES") {
      setLoadingServices(true);
      api
        .get("/emergency-services")
        .then((res) => {
          console.log("Admin services:", res.data);
          setServices(res.data);
        })
        .catch((err) => {
          console.error("Failed to load services", err);
        })
        .finally(() => {
          setLoadingServices(false);
        });
    }
  }, [activeView]);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldAlert className="text-blue-600" />
            Admin Command Center
          </h1>
          <p className="text-gray-500">
            Platform oversight and emergency management
          </p>
        </div>

        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveView("ALERTS")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              activeView === "ALERTS"
                ? "bg-white text-red-600 shadow-sm"
                : "text-gray-500"
            }`}
          >
            SOS Alerts
          </button>
          <button
            onClick={() => setActiveView("SERVICES")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              activeView === "SERVICES"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500"
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setActiveView("DONORS")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              activeView === "DONORS"
                ? "bg-white text-orange-600 shadow-sm"
                : "text-gray-500"
            }`}
          >
            Donors
          </button>
        </div>
      </header>

      {/* ============================
         ALERTS (DUMMY)
         ============================ */}
      {activeView === "ALERTS" && (
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <AlertTriangle className="text-red-600" />
            Recent SOS Signals
          </h3>

          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-2"
            >
              <div>
                <p className="font-semibold">User_{i}00</p>
                <p className="text-xs text-gray-500">2 mins ago</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                  <Eye size={18} />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                  <Check size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================
         SERVICES (REAL BACKEND)
         ============================ */}
      {activeView === "SERVICES" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingServices && (
            <p className="text-gray-500">Loading services...</p>
          )}

          {!loadingServices && services.length === 0 && (
            <p className="text-gray-500">No services found.</p>
          )}

          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-xl border shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <PhoneCall size={20} />
                </div>
                <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>

              <div>
                <h4 className="font-bold text-gray-900">{service.name}</h4>
                <p className="text-sm text-gray-500">{service.city}</p>
                <p className="text-sm font-mono text-blue-600">
                  {service.phone}
                </p>
              </div>

              <div className="pt-4 border-t flex justify-between text-xs font-bold">
                <span
                  className={`${
                    service.verified ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {service.verified ? "VERIFIED" : "UNVERIFIED"}
                </span>
                <span className="text-gray-400">ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================
         DONORS (DUMMY)
         ============================ */}
      {activeView === "DONORS" && (
        <div className="bg-white rounded-xl border shadow-sm p-6">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <Droplet className="text-red-600" />
            Donor Applications
          </h3>

          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-2"
            >
              <div>
                <p className="font-semibold">Applicant {i}</p>
                <p className="text-xs text-gray-500">Blood Group: O+</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-green-100 text-green-700 rounded-lg">
                  <Check size={18} />
                </button>
                <button className="p-2 bg-red-100 text-red-700 rounded-lg">
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
