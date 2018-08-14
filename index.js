const Hapi = require('hapi');
const InvalidIdError = require('./src/errors/invalid-id');
const issueCredential = require('./src/issue-credential');

const server = Hapi.server({
  port: 3000,
  host: '0.0.0.0',
});

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

server.route({
  method: 'POST',
  path: '/issue-credential',
  handler: async (request, h) => {
    let credential;

    try {
      credential = await issueCredential(request.payload.dni);
    } catch (e) {
      if (e instanceof InvalidIdError) {
        return h.response({ error: e.message }).code(403);
      }
    }

    return { credential };
  },
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
