const { Service } = require('feathers-mongoose');

exports.Friends = class Friends extends Service {
    async create(data, params) {
        // Set the requester. Refers to the user who issued this request.
        const requester = params.user

        // Set the recipient. Refers to the friend.
        const { recipient } = data

        return super.create({ requester, recipient })
    }

    async find(params) {
        if (!params.user) {
            return super.find({ query: { ...params } })
        }

        // Control reaches here iff method was called directly by client
        const requester = params.user
        return super.find({ requester })
    }

    async remove(id, params) {
        const requester = params.user
        const recipientId = id

        return await super.remove(null, {
            query: {
                requester,
                recipient: recipientId
            }
        })
    }

    setup(app) {
        this.app = app
    }
};
