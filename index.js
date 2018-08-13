'use strict';

const Hapi = require('hapi');

const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0'
});

const init = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {
      return 'Hello, world!';
  }
});

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
