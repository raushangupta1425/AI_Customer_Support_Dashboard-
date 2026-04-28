import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, admin }) {
  const token = localStorage.getItem('supportToken');
  const role = localStorage.getItem('supportRole');

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (admin && role !== 'admin') {
    return <Navigate to="/chat" replace />;
  }
  return children;
}

export default ProtectedRoute;
