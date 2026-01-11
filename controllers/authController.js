// controllers/authController.js
const crypto = require('crypto');
const { readUsers, writeUsers } = require('../utils/db'); // Panggil helper tadi

exports.register = (req, res) => {
    const { username, password, role } = req.body;
    const users = readUsers();

    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'Username sudah dipakai!' });
    }

    // Generate Key sesuai format kamu
    const newApiKey = 'sk-pws-' + crypto.randomBytes(16).toString('hex');
    const newUser = { id: Date.now(), username, password, role, apiKey: newApiKey };

    users.push(newUser);
    writeUsers(users);

    res.json({ message: 'Registrasi berhasil!', apiKey: newApiKey, role });
};

exports.login = (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.json({ message: 'Login sukses', username: user.username, role: user.role, apiKey: user.apiKey });
    } else {
        res.status(401).json({ message: 'Username atau password salah!' });
    }
};

exports.loginByKey = (req, res) => {
    const { apiKey } = req.body;
    const users = readUsers();
    const user = users.find(u => u.apiKey === apiKey);

    if (user) {
        res.json({ message: 'Login Key sukses', username: user.username, role: user.role, apiKey: user.apiKey });
    } else {
        res.status(401).json({ message: 'API Key tidak valid!' });
    }
};