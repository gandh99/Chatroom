const { Service } = require('feathers-mongoose');

exports.Message = class Message extends Service {
    create(data, params) {
        // Add sender to the message  
        const sender = params.user
        data.sender = sender

        return super.create(data, params)
    }
};
