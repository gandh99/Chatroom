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
            // Error: Recipient is the same as the requester
            if (requester.username === username) throw new BadRequest('You cannot add yourself as a friend.')

            // Extract the user of the friend
            recipient = await this.app.service('users').find({ query: { username, $limit: 1 } })

            // Error: User does not exist
            if (recipient.total <= 0) throw new NotFound('User does not exist.')

            // Error: User is already added as a friend

            recipient = recipient.data[0]
        } catch (error) {
            return Promise.reject(error)
        }

        return super.create({
            requester,
            recipient
        })
    }

    async find(params) {
        const usersService = this.app.service('users')
        const requester = params.user

        // Get the friends in the form of the friends schema
        const friends = await super.find({ requester })

        // Get the users from the friends schema
        let friendsUsers = await Promise.all(
            friends.data.map(friend => (
                usersService.find({
                    query: {
                        _id: friend.recipient,
                        $limit: 1,
                        $select: ['_id', 'username']
                    }
                })
            ))
        )
        friendsUsers = friendsUsers.map(friendUser => friendUser.data[0])

        return friendsUsers
    }

    setup(app) {
        this.app = app
    }
};
