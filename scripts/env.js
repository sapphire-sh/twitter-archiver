const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env');
const data = fs.readFileSync(envPath).toString();

console.log(data.replace(/\n/g, ' '));
