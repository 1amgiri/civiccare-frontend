
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Home, PhoneCall, Droplet, 
  AlertTriangle, LogOut, ShieldAlert, User as UserIcon 
} from 'lucide-react';
import { Role } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home, roles: [Role.USER, Role.ADMIN] },
    { name: 'Emergency Services', href: '/emergency', icon: PhoneCall, roles: [Role.USER, Role.ADMIN] },
    { name: 'Blood Donation', href: '/blood', icon: Droplet, roles: [Role.USER, Role.ADMIN] },
    { name: 'SOS Alert', href: '/sos', icon: AlertTriangle, roles: [Role.USER, Role.ADMIN] },
    { name: 'Admin Control', href: '/admin', icon: ShieldAlert, roles: [Role.ADMIN] },
  ];

  const filteredNav = navigation.filter(item => item.roles.includes(user?.role));

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-blue-600 text-white rounded-full shadow-lg"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShieldAlert className="text-blue-400" />
              CivicCare
            </h1>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {filteredNav.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.href 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <UserIcon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    Logged in as: {user?.role === Role.ADMIN ? 'Administrator' : 'Citizen'}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="mt-4 flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
