const axios = require('axios');
const InvalidIdError = require('../src/errors/invalid-id');
const issueCredential = require('../src/issue-credential');

jest.mock('axios');

describe('issue-credential', () => {
  it('should return a credential if given a valid DNI', async () => {
    const requestorDni = '12345678A';
    axios.post.mockResolvedValue({ data: { ok: true, error: '' } });
    const credential = await issueCredential(requestorDni);

    const expectedCredential = '123456789';
    expect(credential).toBe(expectedCredential);
    expect(axios.post).toBeCalledWith('http://verifier:8080/verify', {
      dni: requestorDni,
    });
  });

  it('should throw an InvalidIdError if given an invalid DNI', async () => {
    const requestorDni = 'invalid';
    axios.post.mockResolvedValue({ data: { ok: false, error: 'fail' } });

    await expect(issueCredential(requestorDni))
      .rejects.toThrowError(InvalidIdError);
    expect(axios.post).toBeCalledWith('http://verifier:8080/verify', {
      dni: requestorDni,
    });
  });

  it('should throw a generic Error if there\'s an issue creating the credential', async () => {
    await expect(issueCredential('500'))
      .rejects.toThrow();
  });
});
