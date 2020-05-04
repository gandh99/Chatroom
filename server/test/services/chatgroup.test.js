const app = require('../../src/app');

describe('\'chatgroup\' service', () => {
  it('registered the service', () => {
    const service = app.service('chatgroup');
    expect(service).toBeTruthy();
  });
});
