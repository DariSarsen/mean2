const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const socketIO = require('socket.io');
const http = require('http');

const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// CORS Middleware
const corsOptions = {
  origin: ['http://localhost:4200'],
  methods: "*",
  allowedHeaders: ["my-custom-header", "Authorization", "Content-Type"], 
  credentials: true 
};
app.use(cors(corsOptions));

// Routes
app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);
app.use('/management/users', userRoutes);

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
const uri = 'mongodb+srv://darisarsen24:OPJID5BeWOQyDd69@cluster0.5majkb4.mongodb.net/tasksdb'; 
mongoose.connect(uri)
  .then(() => {
    const server = http.createServer(app);
    const io = socketIO(server, {
      cors: corsOptions 
    });

    io.on('connection', (socket) => {
      // Handle client events
      socket.on('event', (data) => {
        console.log('Received data:', data);
        socket.emit('response', { message: 'Data received successfully' });
      });

      // Handle client disconnections
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
  
const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`MongoDB connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to MongoDB Atlas'));