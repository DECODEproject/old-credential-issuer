const InvalidIdError = require('../src/errors/invalid-id');
const issueCredential = require('../src/issue-credential');

describe('issue-credential', () => {
  it('should return a credential if given a valid DNI', async () => {
    const credential = await issueCredential('12345678A');

    const expectedCredential = '123456789';
    expect(credential).toBe(expectedCredential);
  });

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
