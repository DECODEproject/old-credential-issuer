const axios = require('axios');
const InvalidIdError = require('./errors/invalid-id');

module.exports = async (verifierUrl, dni) => {
  const { data: verifyResponse } = await axios.post(verifierUrl, {
    dni,
  });

  if (!verifyResponse.ok) {
    throw new InvalidIdError();
  }

  const credential = '123456789';
  return credential;
};
