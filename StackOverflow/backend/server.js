const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Move this line here

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const notificationRoutes = require('./routes/notification');

dotenv.config();
const app = express();

// Enable CORS for all routes
app.use(cors()); 

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/notification', notificationRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
