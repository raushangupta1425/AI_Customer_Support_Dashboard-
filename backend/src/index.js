const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const adminRoutes = require('./routes/admin');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.send({ status: 'ok', message: 'AI Customer Support Backend is running.' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
