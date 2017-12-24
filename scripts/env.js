import fs from 'fs';
import path from 'path';

function env() {
	const envPath = path.resolve(__dirname, '../.env');

	const data = fs.readFileSync(envPath).toString();

	return data.replace(/\n/g, ' ');
}

console.log(env());
