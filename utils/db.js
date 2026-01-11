// utils/db.js
const fs = require('fs');
const path = require('path');

// Arahkan ke users.json di folder utama (naik satu level dr folder utils)
const DB_FILE = path.join(__dirname, '../users.json');

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

module.exports = { readUsers, writeUsers };