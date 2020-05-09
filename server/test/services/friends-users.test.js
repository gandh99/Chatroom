const app = require('../../src/app');

describe('\'friends-users\' service', () => {
  it('registered the service', () => {
    const service = app.service('friends-users');
    expect(service).toBeTruthy();
  });
});
