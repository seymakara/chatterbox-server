/* Import node's http module: */
var http = require('http');
var _ = require('underscore');
var handleRequest = require('./request-handler.js');
var $ = require('jquery');

var port = 3000;

var ip = '127.0.0.1';

var server = http.createServer(handleRequest.requestHandler);
console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);


