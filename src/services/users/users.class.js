const { Service } = require('feathers-nedb');

exports.Users = class Users extends Service {
  create (data, params) {
    const { email, password, name } = data;

    const userData = {
      email,
      password,
      name
    };

    return super.create(userData, params);
  }
};
