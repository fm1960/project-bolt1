import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import BuildingPage from './pages/BuildingPage';
import OccupantsPage from './pages/OccupantsPage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes with shared layout */}
          <Route element={<Layout requireAuth />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route 
              path="/analytics" 
              element={<Layout requireRole="manager"><AnalyticsPage /></Layout>} 
            />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route 
              path="/building" 
              element={<Layout requireRole="manager"><BuildingPage /></Layout>} 
            />
            <Route 
              path="/occupants" 
              element={<Layout requireRole="manager"><OccupantsPage /></Layout>} 
            />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
          </Route>
          
          {/* Redirect to dashboard if authenticated, otherwise to login */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;