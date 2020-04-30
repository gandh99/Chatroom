const { Service } = require('feathers-mongoose');
const { NotFound, BadRequest } = require('@feathersjs/errors');

exports.Friends = class Friends extends Service {
    async create(data, params) {
        // Set the requester. Refers to the user who issued this request.
        const requester = params.user

        // Set the recipient. Refers to the friend.
        const { recipient } = data

        // Create the friend
        await super.create({ requester, recipient })

        // Return the user schema of the friend
        return Promise.resolve(recipient)
    }

    async find(params) {
        const usersService = this.app.service('users')
        const requester = params.user

        // Get the friends in the form of the friends schema
        const friendsDoc = await super.find({ requester })

        // Get the users schema from the friends schema
        let friendsUsersDoc = await Promise.all(
            friendsDoc.data.map(friend => (
                usersService.find({
                    query: {
                        _id: friend.recipient,
                        $limit: 1,
                        $select: ['_id', 'username']
                    }
                })
            ))
        )
        let friendsUsers = friendsUsersDoc.map(friendUser => friendUser.data[0])

        return friendsUsers
    }

    setup(app) {
        this.app = app
    }
};
