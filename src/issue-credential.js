const InvalidIdError = require('./errors/invalid-id');

module.exports = async (dni) => {
  throw new InvalidIdError();
};
