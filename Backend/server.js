const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware - Allow all origins for public API access
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false,
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/counselling', require('./routes/counselRoutes'));
app.use('/api/academic', require('./routes/academicRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/parents', require('./routes/parentRoutes'));
app.use('/api/internships', require('./routes/internshipRoutes'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
