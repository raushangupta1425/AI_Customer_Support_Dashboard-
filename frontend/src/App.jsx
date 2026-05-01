import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/Chat';
import Admin from './components/Admin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('supportToken');
  const role = localStorage.getItem('supportRole');

  const logout = () => {
    localStorage.removeItem('supportToken');
    localStorage.removeItem('supportUser');
    localStorage.removeItem('supportRole');
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/chat" className="brand">AI Support Dashboard</Link>
        <nav>
          {token ? (
            <>
              <Link to="/admin">Admin</Link>
              <Link to="/chat">Chat</Link>
              {role === 'admin' && <Link to="/admin">Admin</Link>}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to="/chat" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute admin><Admin /></ProtectedRoute>} />
          <Route path="*" element={<div>Page not found.</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
