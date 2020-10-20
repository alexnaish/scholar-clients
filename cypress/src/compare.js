const fs = require('fs');
const fetch = require('node-fetch');
const { throwMismatchError } = require('./errors');

const DEFAULT_HOST = 'http://localhost:3000';
const DEFAULT_PATH = '/snapshot';
const imageCache = {};

module.exports = {
	imageCache,
	compareSnapshot: config => async (details) => {
		const { host = DEFAULT_HOST, path = DEFAULT_PATH, key } = config;
		const { name } = details;
		const image = imageCache[name];

		if (image) {
			const { dimensions, path: imagePath } = image;
			const fileBuffer = fs.readFileSync(imagePath);
			const response = await fetch(`${host}${path}`, {
				method: 'POST',
				timeout: 5000,
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': key
				},
				body: JSON.stringify({
					name,
					dimensions,
					snapshot: fileBuffer
				})
			});

			switch (response.status) {
				case 409:
					const json = await response.json();
					return throwMismatchError({ name, host, response, json });
			}

		}
	}
}
