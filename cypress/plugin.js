const { recordTaskName, compareTaskName } = require('./src/config');
const { imageCache, compareSnapshot } = require('./src/compare');

const startSnapshot = ({ name }) => {
	imageCache[name] = true;
}

const postSnapshotHook = (details) => {
	const { name } = details;
	if(imageCache[name]) {
		imageCache[name] = details;
	}
}

module.exports = (on, config) => {
	on('task', {
    [recordTaskName]: startSnapshot,
    [compareTaskName]: compareSnapshot(config),
  });
  on('after:screenshot', postSnapshotHook);
}
