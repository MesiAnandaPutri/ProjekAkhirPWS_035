// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api'); // Panggil router yang kita buat

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Setup Static Files (Frontend)
app.use(express.static(__dirname)); 
app.use(express.static(path.join(__dirname, 'publicc'))); // Sesuai kodemu

// Panggil Routes API
// Otomatis semua URL di api.js akan berawalan /api
// Contoh: /register di api.js -> menjadi /api/register
app.use('/api', apiRoutes);

app.listen(PORT, () => console.log(`Server nyala di http://localhost:${PORT}`));