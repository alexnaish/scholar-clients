const lineBreak = '----------'

module.exports = {
	throwMismatchError: ({ name, host, response, json }) => {
		const errorObject = new Error();
		errorObject.name = 'Scholar';
		errorObject.message = `
			${lineBreak}
			Mismatch (${response.status})
			${lineBreak}
			Compatibility: ${json.compatibility}%
			Link: ${host}/snapshot/${name}
		`.replace(/\t/g, '');

		throw errorObject;
	}
}
