import { useEffect, useState } from 'react';
import api from '../api';

function Admin() {
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/admin/users');
      setUsers(response.data.users);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load users.');
    }
  };

  const fetchChats = async (userId) => {
    try {
      const url = userId ? `/api/admin/chats?userId=${userId}` : '/api/admin/chats';
      const response = await api.get(url);
      setChats(response.data.chats);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load chats.');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchChats();
  }, []);

  const removeUser = async (userId) => {
    if (!window.confirm('Delete this user and their chats?')) return;
    try {
      await api.delete(`/api/admin/users/${userId}`);
      fetchUsers();
      fetchChats();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user.');
    }
  };
  
  const removeChat = async (chatId) => {
    if (!window.confirm('Delete this chat record?')) return;
    try {
      await api.delete(`/api/admin/chats/${chatId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete chat.');
    }
  };

  const showUserChats = (userId) => {
    setSelectedUser(userId);
    fetchChats(userId);
  };

  return (
    <div className="panel-card">
      <h2>Admin Dashboard</h2>
      {error && <p className="error">{error}</p>}
      <div className="panel-card">
        <h3>Users</h3>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => showUserChats(user._id)}>View chats</button>
                    <button onClick={() => removeUser(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel-card" style={{ marginTop: '1.5rem' }}>
        <h3>Chat records {selectedUser ? '(filtered)' : ''}</h3>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Message</th>
                <th>Response</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {chats.map((chat) => (
                <tr key={chat._id}>
                  <td>{chat.userId?.name || 'Unknown'}</td>
                  <td>{chat.message}</td>
                  <td>{chat.response}</td>
                  <td>{new Date(chat.createdAt).toLocaleString()}</td>
                  <td>
                    <button onClick={() => removeChat(chat._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
