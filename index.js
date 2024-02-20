const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const app = express();
const port = 3000;

app.use(bodyParser.json());


app.use(cors({
  origin:[
    'http://localhost:4200',
    'http://localhost:4000',
  ]
}));


app.use('/tasks', taskRoutes);
app.use('/auth', authRoutes);
app.use('/management/users', userRoutes);

const uri = 'mongodb+srv://darisarsen24:OPJID5BeWOQyDd69@cluster0.5majkb4.mongodb.net/tasksdb';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongoose is connected');
    app.listen(port, () => {
      console.log("Server is running at port: " + port);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));
