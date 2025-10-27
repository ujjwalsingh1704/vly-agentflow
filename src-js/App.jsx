import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Outlet, Navigate, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Toaster } from 'sonner';
import { TooltipProvider } from './components/ui/tooltip';
import DashboardLayout from './components/DashboardLayout';
import TestComponent from './components/TestComponent';

// Pages
import Index from './pages/Index';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import VoiceAgent from './pages/VoiceAgent';
import Activity from './pages/Activity';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import ChatbotWidget from './components/ChatbotWidget';

const queryClient = new QueryClient();

// Simple auth context to manage authentication state
export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user is authenticated on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log('Initial auth check - token exists:', !!token);
    if (token) {
      console.log('Setting isAuthenticated to true');
      setIsAuthenticated(true);
    } else {
      console.log('No auth token found');
    }
  }, []);

  const login = (token) => {
    console.log('Login called with token:', token);
    localStorage.setItem('authToken', token);
    console.log('Setting isAuthenticated to true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log('Logout called');
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);
  
  if (!isAuthenticated) {
    console.log('ProtectedRoute - Redirecting to /auth');
    return <Navigate to="/auth" state={{ from: window.location.pathname }} replace />;
  }
  
  console.log('ProtectedRoute - Rendering protected content');
  return children;
};

// Layout wrapper for protected routes
const ProtectedLayout = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

const App = () => {
  console.log('App component rendering');
  
  const history = createBrowserHistory({
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster position="top-center" />
        <AuthProvider>
          <BrowserRouter
            future={{
              v7_relativeSplatPath: true,
              v7_startTransition: true
            }}
          >
            <div className="app">
              <h1>Vly AI Platform</h1>
              <nav>
                <button onClick={() => window.location.href = '/'}>Home</button>
                <button onClick={() => window.location.href = '/auth'}>Auth</button>
              </nav>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* Protected Routes */}
                <Route element={<ProtectedRoute><ProtectedLayout /></ProtectedRoute>}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/leads" element={<Leads />} />
                  <Route path="/voice-agent" element={<VoiceAgent />} />
                  <Route path="/activity" element={<Activity />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
