const { Service } = require('feathers-mongoose');
const { NotFound, GeneralError, BadRequest } = require('@feathersjs/errors');

exports.Friends = class Friends extends Service {
    async create(data, params) {
        // Refers to the user who issued this request
        const requester = params.user

        // Refers to the username of the friend
        const { username } = data
        let recipient

        try {
            recipient = await this.app.service('users').find({ query: { username, $limit: 1 } })
            if (recipient.total <= 0) throw new NotFound('User does not exist.')
            recipient = recipient.data[0]
        } catch (error) {
            return Promise.reject(error)
        }

        return super.create({
            requester,
            recipient
        })
    }

    setup(app) {
        this.app = app
    }
};
