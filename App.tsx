
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EmergencyServices from './pages/EmergencyServices';
import BloodDonation from './pages/BloodDonation';
import SOS from './pages/SOS';
import AdminDashboard from './pages/AdminDashboard';
import { Role, User } from './types';
import { USER_KEY, TOKEN_KEY } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleAuth = (userData: User) => {
    setUser(userData);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    localStorage.setItem(TOKEN_KEY, 'mock-jwt-token-auth-success'); // In real app, from API response
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  // Fix: Made children prop optional in the type definition to resolve TypeScript errors where children were not correctly inferred from JSX content
  const ProtectedRoute = ({ children, roles }: { children?: React.ReactNode, roles?: Role[] }) => {
    if (!user) return <Navigate to="/login" />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
    return (
      <Layout user={user} onLogout={handleLogout}>
        {children}
      </Layout>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleAuth} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register onRegister={handleAuth} />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard user={user} />
          </ProtectedRoute>
        } />

        <Route path="/emergency" element={
          <ProtectedRoute>
            <EmergencyServices />
          </ProtectedRoute>
        } />

        <Route path="/blood" element={
          <ProtectedRoute>
            <BloodDonation />
          </ProtectedRoute>
        } />

        <Route path="/sos" element={
          <ProtectedRoute>
            <SOS />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute roles={[Role.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
