import { getCodeApiAuthHeaders } from './codeapi';

describe('getCodeApiAuthHeaders', () => {
  const original = process.env.LIBRECHAT_CODE_API_KEY;

  afterEach(() => {
    if (original === undefined) {
      delete process.env.LIBRECHAT_CODE_API_KEY;
    } else {
      process.env.LIBRECHAT_CODE_API_KEY = original;
    }
  });

  it('returns an empty object when the key is unset', () => {
    delete process.env.LIBRECHAT_CODE_API_KEY;
    expect(getCodeApiAuthHeaders()).toEqual({});
  });

  it('returns an empty object when the key is whitespace only', () => {
    process.env.LIBRECHAT_CODE_API_KEY = '   ';
    expect(getCodeApiAuthHeaders()).toEqual({});
  });

  it('returns the x-api-key header from LIBRECHAT_CODE_API_KEY', () => {
    process.env.LIBRECHAT_CODE_API_KEY = 'consumer-secret';
    expect(getCodeApiAuthHeaders()).toEqual({ 'x-api-key': 'consumer-secret' });
  });

  it('trims surrounding whitespace from the key', () => {
    process.env.LIBRECHAT_CODE_API_KEY = '  consumer-secret  ';
    expect(getCodeApiAuthHeaders()).toEqual({ 'x-api-key': 'consumer-secret' });
  });
});
