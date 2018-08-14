class InvalidIdError extends Error {
  constructor(message) {
    super(message || 'The specified ID is not valid');
  }
}

module.exports = InvalidIdError;
