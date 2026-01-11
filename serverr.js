const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = 3000;
const DB_FILE = 'users.json';

app.use(cors());
app.use(bodyParser.json());

// Agar halaman web bisa dibuka
app.use(express.static(__dirname)); 
app.use(express.static(path.join(__dirname, 'publicc')));

// --- DATABASE FUNCTION ---
const readUsers = () => {
    if (!fs.existsSync(DB_FILE)) return [];
    try {
        const data = fs.readFileSync(DB_FILE);
        return JSON.parse(data);
    } catch (e) { return []; }
};

const writeUsers = (users) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
};

// --- ROUTES ---

// 1. REGISTER
app.post('/api/register', (req, res) => {
    const { username, password, role } = req.body;
    const users = readUsers();

    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'Username sudah dipakai!' });
    }

    const newApiKey = 'sk-pws-' + crypto.randomBytes(16).toString('hex');
    const newUser = { id: Date.now(), username, password, role, apiKey: newApiKey };

    users.push(newUser);
    writeUsers(users);

    res.json({ message: 'Registrasi berhasil!', apiKey: newApiKey, role });
});

// 2. LOGIN BIASA
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ message: 'Login sukses', username: user.username, role: user.role, apiKey: user.apiKey });
    } else {
        res.status(401).json({ message: 'Username atau password salah!' });
    }
});
