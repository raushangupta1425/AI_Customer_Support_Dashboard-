import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
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
      const response = await api.post('/auth/register', form);
      localStorage.setItem('supportToken', response.data.token);
      localStorage.setItem('supportUser', response.data.user.name);
      localStorage.setItem('supportRole', response.data.user.role);
      navigate('/chat');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="form-card">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required minLength={6} />
        </div>
        <button className="primary" type="submit">Create Account</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;
