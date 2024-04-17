import { readdirSync } from 'fs';
import './jsx';

export const commands = new Map<string, object>();

(async () => {
	for(const name of readdirSync(__dirname + '/api')) {
		await import(`${__dirname}/api/${name}`)
	}
	console.log(commands.get("app"))
})()
