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
            const recipientDoc = await this.app.service('users').find({
                query: {
                    username, 
                    $limit: 1,
                    $select: ['_id', 'username']
                }
            })

            // Error: User does not exist
            if (recipientDoc.total <= 0) throw new NotFound('User does not exist.')

            // Error: User is already added as a friend
            const existingFriendDoc = await this.app.service('friends').find({
                query: {
                    recipient: recipientDoc.data[0]
                }
            })
            if (existingFriendDoc.length > 0) throw new BadRequest('User is already a friend.')

            // If no errors, extract the recipient from the doc
            recipient = recipientDoc.data[0]
        } catch (error) {
            return Promise.reject(error)
        }

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
