// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PharmaSync from './components/PharmaSync';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import Staff from './pages/Staff';
import Analytics from './pages/Analytics';
import Verification from './pages/Verification';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

function App() {
  const dashboardRoutes = [
    { path: '/dashboard', element: <PharmaSync /> },
    { path: '/inventory', element: <Inventory /> },
    { path: '/reports', element: <Reports /> },
    { path: '/staff', element: <Staff /> },
    { path: '/verification', element: <Verification />},
    { path: '/analytics', element: <Analytics />},
    { path: '/documents', element: <Documents />},
    { path: '/settings', element: <Settings />},
    // Add other routes here
  ];

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Dashboard Routes */}
        {dashboardRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  {element}
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        ))}
        
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;