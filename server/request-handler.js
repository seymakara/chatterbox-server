var url = require('url');
var http = require('http');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var data = { results: [] };

var requestHandler = function (request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';
  if (request.url.includes('/classes/messages')) {
    if (request.method === 'GET') {
      response.writeHead(200, headers);
      response.end(JSON.stringify(data));
      console.log('GET', data.results);
    }
    if (request.method === 'POST') {
      let body = '';
      request.on('data', chunk => {
        body += chunk.toString();
      });
      request.on('end', () => {
        data.results.push(JSON.parse(body));
        console.log('POST', data.results);
        response.writeHead(201, headers);
        response.end(JSON.stringify(data));
      });
    }
    if (request.method === 'OPTIONS') {
      console.log('OPTIONS', data.results);
      response.writeHead(200, headers);
      response.end();
    }
  } else {
    response.writeHead(404, headers);
    response.end();
  }

};

module.exports.requestHandler = requestHandler;

