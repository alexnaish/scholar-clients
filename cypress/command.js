const { recordTaskName, compareTaskName } = require('./src/config');

const name = 'scholarSnapshot';

/*
	The main function, comprises of the registration of new snapshots, the taking of the screenshot and the final comparison.
	* @param {object} subject - the element to take the screenshot off. Optional.
	* @param {string} name - the name of your screenshot.
	* @param {object} options - the options to pass to cy.screenshot.
	**/
const commandFunction = (subject, name, options) => {
	cy.task(recordTaskName, { name });
	const parent = subject ? cy.wrap(subject) : cy;
	parent.screenshot(name, options);
	return cy.task(compareTaskName, { name });
}

module.exports = (cypressGlobal) => {
	cypressGlobal.Commands.add(name, { prevSubject: 'optional' }, commandFunction);
}

module.exports.commandName = name;
module.exports.commandFunction = commandFunction;
