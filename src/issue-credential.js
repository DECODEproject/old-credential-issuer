const axios = require('axios');
const InvalidIdError = require('./errors/invalid-id');

module.exports = async (dni) => {
  if (dni === '500') {
    throw new Error();
  }

  const { data: verifyResponse } = await axios.post('http://verifier:8080/verify', {
    dni,
  });

  if (!verifyResponse.ok) {
    throw new InvalidIdError();
  }

  const credential = '123456789';
  return credential;
};
