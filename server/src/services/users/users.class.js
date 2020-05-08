const { Service } = require('feathers-mongoose');

exports.Users = class Users extends Service {
    async addToFriendsArray(userId, friendToAdd) {
        return super.patch(
            userId,
            { $push: { friends: friendToAdd } }
        )
    }

    async removeFromFriendsArray(userId, friendToRemove) {
        const user = await super.get(userId)
        user.friends = user.friends.filter(friend => friend.toString() !== friendToRemove._id.toString())
        return super.patch(userId, user)
    }
};
