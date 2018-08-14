const InvalidIdError = require('../src/errors/invalid-id');
const issueCredential = require('../src/issue-credential');

describe('issue-credential', () => {
  it('should throw an InvalidIdError if given an invalid DNI', async () => {
    let error;
    try {
      await issueCredential('invalid');
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(InvalidIdError);
  });
});
