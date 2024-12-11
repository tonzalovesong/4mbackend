// index.js หรือ server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { readdirSync } from 'fs';
import path from 'path';
import http from 'http';
import 'dotenv/config';

const app = express();

// MongoDB connection logging
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

// ตั้งค่า MongoDB - ลบ options ที่ไม่จำเป็น
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('DB connected'))
.catch(err => {
  console.log('DB Connection Error:', err);
  process.exit(1);
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors({
  origin: '*', // ระบุ origin ที่แน่นอน
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.urlencoded({ extended: false }));

// Routes
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// ปรับปรุงการโหลด routes
const loadRoutes = async () => {
  try {
    const routes = readdirSync('./routes');
    for (const r of routes) {
      console.log(`Loading route: ${r}`);
      const route = await import(`./routes/${r}`);
      app.use('/api', route.default);
    }
    console.log('All routes loaded successfully');
  } catch (err) {
    console.log('Error loading routes:', err);
    throw err;
  }
};

// Error handlers
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: err.message || 'Something broke!',
    path: req.path
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception:', err);
  process.exit(1);
});

// โหลด routes ก่อนเริ่ม server
try {
  await loadRoutes();
  
  // สร้าง HTTP Server
  const server = http.createServer(app);


  // server.js หรือ index.js
const port = process.env.PORT || 3005;
server.listen(port,  () => {
  console.log(`Server is running on port ${port}`);
});
} catch (err) {
  console.error('Failed to start server:', err);
  process.exit(1);
}