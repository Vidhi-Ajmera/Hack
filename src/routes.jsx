import { Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
// Import other pages...

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { 
    path: '/dashboard', 
    element: <ProtectedRoute><DashboardPage /></ProtectedRoute> 
  },
  // Other routes...
];

export default routes;