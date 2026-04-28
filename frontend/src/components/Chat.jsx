import { useEffect, useState } from 'react';
import api from '../api';

function Chat() {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadHistory = async () => {
    try {
      const response = await api.get('/chat/history');
      setHistory(response.data.history);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load chat history.');
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/chat', { message });
      setHistory((prev) => [...prev, response.data.chat]);
      setMessage('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel-card">
      <h2>Chat with AI Support</h2>
      {error && <p className="error">{error}</p>}
      <div className="message-list">
        {history.map((item) => (
          <div key={item._id} className="message-block">
            <div className="message-item user">
              <div className="label">You</div>
              <p>{item.message}</p>
            </div>
            <div className="message-item ai">
              <div className="label">AI</div>
              <p>{item.response}</p>
            </div>
          </div>
        ))}
      </div>
      <form className="chat-controls" onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={4}
          placeholder="Type your support question here..."
          required
        />
        <div className="chat-footer">
          <button className="primary" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
