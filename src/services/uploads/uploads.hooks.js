const { authenticate } = require('@feathersjs/authentication').hooks;

const encodeFiles = require('../../hooks/encode.files');

const saveUserFile = require('../../hooks/save.user.file');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [encodeFiles()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [saveUserFile()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
