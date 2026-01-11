// controllers/userController.js
const { readUsers, writeUsers } = require('../utils/db');

exports.getAllUsers = (req, res) => {
    res.json(readUsers());
};

exports.deleteUser = (req, res) => {
    const users = readUsers();
    const newUsers = users.filter(u => u.username !== req.params.username);
    writeUsers(newUsers);
    res.json({ message: 'Dihapus' });
};