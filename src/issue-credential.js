const InvalidIdError = require('./errors/invalid-id');

module.exports = async (dni) => {
  if (dni === 'invalid') {
    throw new InvalidIdError();
  }

  const credential = '123456789';
  return credential;
};
