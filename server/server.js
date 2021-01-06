const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// be able to access bodyparser middleware
app.use(express.json());

// import routes
const authRoutes = require('./routes/auth');

// middlewares
app.use('/api', authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`API is running on port ${port}`));
