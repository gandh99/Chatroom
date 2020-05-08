const { Service } = require('feathers-mongoose');

exports.Friends = class Friends extends Service {
    // async find(params) {
    //     if (!params.user) {
    //         return super.find({ query: { ...params } })
    //     }

    //     // Control reaches here iff method was called directly by client
    //     const requester = params.user
    //     return super.find({ query: { requester } })
    // }

    // async remove(id, params) {
    //     const requester = params.user
    //     const recipientId = id

    //     return await super.remove(null, {
    //         query: {
    //             requester,
    //             recipient: recipientId
    //         }
    //     })
    // }

    setup(app) {
        this.app = app
    }
};
