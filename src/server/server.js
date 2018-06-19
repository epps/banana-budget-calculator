const server = require('http').createServer();

const handleApiRequest = require('./request-handler');

server.on('request', handleApiRequest);

module.exports = server;