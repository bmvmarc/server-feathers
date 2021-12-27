const assert = require('assert');
const app = require('../../src/app');

describe('\'user.files\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-files');

    assert.ok(service, 'Registered the service');
  });
});
