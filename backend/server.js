const express = require('express');
const cors = require('cors');
const resultRoutes = require('./routes/result');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', resultRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('IET DAVV Result Viewer Backend is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});