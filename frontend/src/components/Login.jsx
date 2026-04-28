import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', form);
      localStorage.setItem('supportToken', response.data.token);
      localStorage.setItem('supportUser', response.data.user.name);
      localStorage.setItem('supportRole', response.data.user.role);
      navigate('/chat');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="form-card">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
        </div>
        <button className="primary" type="submit">Login</button>
      </form>
      <p>
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}

export default Login;
