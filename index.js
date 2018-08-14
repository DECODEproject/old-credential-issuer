const Hapi = require('hapi');
const InvalidIdError = require('./src/errors/invalid-id');
const issueCredential = require('./src/issue-credential');

const server = Hapi.server({
  port: 3000,
  host: '0.0.0.0',
});

const init = async () => {
  await server.start();
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

      return h.response({
        error: 'There was an error while issuing the credential',
      }).code(500);
    }

    return { credential };
  },
});

init();
