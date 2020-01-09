let shouldLog = true;
const forceLog = (message, ...args) => console.log(`**** ${message}`, ...args);
const log = (message, ...args) => shouldLog && forceLog(message, ...args);

module.exports = {forceLog, log};
