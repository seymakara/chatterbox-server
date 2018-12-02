var url = require('url');
var http = require('http');

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var data = { results: [] };

// ******** EXTRACT FUNCTION ********

var GET = function(statusCode, headers, response){
  statusCode = 200;
  headers['Content-Type'] = 'application/json';
  response.writeHead(statusCode, headers);
  console.log("DATA", data)
  // response.write(JSON.stringify(data)) // test fails with response.write but app works, teat might be running the old version.
  response.end(JSON.stringify(data)); // rensponse.end(JSON.stringify(data)) = response.write(JSON.stringify(data)) + response.end();
}

var POST = function(statusCode, headers, request, response){
  statusCode = 201;
  headers['Content-Type'] = 'application/json';
  let body = '';
  request.on('data', chunk => {
    body += chunk.toString();
  });

  request.on('end', () => { // this listens for the end of the request
    data.results.push(JSON.parse(body));
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(data)); // this listens for the end of the response
  });
}

var OPTIONS = function(statusCode, headers, response){
  statusCode = 200;
  headers['Content-Type'] = 'application/json';
  response.writeHead(statusCode, headers);
  response.end();
}

var requestHandler = function (request, response){
  var headers = defaultCorsHeaders;
  // headers['Content-Type'] = 'application/json';
  var statusCode;
  if (request.url.includes('/classes/messages')){
    if (request.method === 'GET'){
      GET(statusCode, headers, response);
    }
    if (request.method === 'POST'){
      POST(statusCode, headers, request, response);
    }
    if (request.method === 'OPTIONS'){
      OPTIONS(statusCode, headers, response);
    }
  }else {
    response.writeHead(404, headers);
    response.end();
  }
}


// ******** INLINE FUNCTION ********

// var requestHandler = function (request, response) {
//   console.log('Serving request type ' + request.method + ' for url ' + request.url);
//   var headers = defaultCorsHeaders;
//   headers['Content-Type'] = 'application/json';
//   if (request.url.includes('/classes/messages')) {
//     if (request.method === 'GET') {
//       response.writeHead(200, headers);
//       console.log("RESPONSE", response)
//       response.end(JSON.stringify(data));
//     }
//     if (request.method === 'POST') {
//       let body = '';
//       request.on('data', chunk => {
//         body += chunk.toString();
//       });
//       request.on('end', () => { // this listens for the end of the request
//         console.log("body", JSON.parse(body))
//         data.results.push(JSON.parse(body));
//         response.writeHead(201, headers);
//         response.end(JSON.stringify(data)); // this listens for the end of the response
//       });
//     }
//     if (request.method === 'OPTIONS') {
//       response.writeHead(200, headers);
//       response.end();
//     }
//   } else {
//     response.writeHead(404, headers);
//     response.end();
//   }

// };

module.exports.requestHandler = requestHandler;

