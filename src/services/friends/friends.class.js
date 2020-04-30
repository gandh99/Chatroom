const { Service } = require('feathers-mongoose');

exports.Friends = class Friends extends Service {
    async create(data, params) {
        // Set the requester. Refers to the user who issued this request.
        const requester = params.user

        // Set the recipient. Refers to the friend.
        const { recipient } = data

        return super.create({ requester, recipient })
    }

    // TODO
    async find(params) {
        const requester = params.user
        return super.find({ requester })
    }

    // TODO
    async findByParams(params) {
        return super.find({ query: { ...params }})
    }

    setup(app) {
        this.app = app
    }
};
