const { Service } = require('feathers-mongoose');

exports.Users = class Users extends Service {
    create(data, params) {
        console.log(data)
        return super.create(data, params)
    }
};
