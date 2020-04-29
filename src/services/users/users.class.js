const { Service } = require('feathers-mongoose');

exports.Users = class Users extends Service {
    async patch(id, data, params) {
        const { username } = data
        const user = await this.find({ query: { username, $limit: 1 } })
        console.log(user.data[0], params)
        return user.data[0]
    }
};
