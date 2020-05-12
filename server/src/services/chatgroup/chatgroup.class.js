const { Service } = require('feathers-mongoose');

exports.Chatgroup = class Chatgroup extends Service {
    create(data, params) {
        const { members } = data

        // Determine if the chatgroup is private (2 users in total) or not
        data.isPrivate = (members.length <= 1) ? true : false

        return super.create(data, params)
    }
};
