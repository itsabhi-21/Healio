const express = require('express');
const cors = require('cors');
const aiRoutes = require('./src/routes/ai.routes');
const authRoutes = require('./src/routes/auth.routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', aiRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;