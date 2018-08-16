const axios = require('axios');
const InvalidIdError = require('../src/errors/invalid-id');
const issueCredential = require('../src/issue-credential');

jest.mock('axios');

describe('issue-credential', () => {
  let verifierUrl = '';
  beforeEach(() => {
    verifierUrl = 'http://verifier:8080/verify';
  });

  it('should return a credential if given a valid DNI', async () => {
    const requestorDni = '12345678A';
    axios.post.mockResolvedValue({ data: { ok: true, error: '' } });
    const credential = await issueCredential(verifierUrl, requestorDni);

    const expectedCredential = '123456789';
    expect(credential).toBe(expectedCredential);
    expect(axios.post).toBeCalledWith(verifierUrl, {
      dni: requestorDni,
    });
  });

  it('should throw an InvalidIdError if given an invalid DNI', async () => {
    const requestorDni = 'invalid';
    axios.post.mockResolvedValue({ data: { ok: false, error: 'fail' } });

    await expect(issueCredential(verifierUrl, requestorDni))
      .rejects.toThrowError(InvalidIdError);
    expect(axios.post).toBeCalledWith(verifierUrl, {
      dni: requestorDni,
    });
  });

  it('should throw a generic Error if there\'s an issue creating the credential', async () => {
    const requestorDni = '500';
    axios.post.mockRejectedValue(new Error());
    await expect(issueCredential(verifierUrl, requestorDni))
      .rejects.toThrow();
    expect(axios.post).toBeCalledWith(verifierUrl, {
      dni: requestorDni,
    });
  });
});
