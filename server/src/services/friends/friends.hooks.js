const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  protect
} = require('@feathersjs/authentication-local').hooks;

const validateFriends = require('../../hooks/validate-friends');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [validateFriends()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [
      async context => {
        const friendsArray = context.result.data

        // Get and return the 'users' model of every recipient in the friendsArray
        const users = await Promise.all(
          friendsArray.map(friend => (
            getUserFromFriend(context, friend.recipient)
          ))
        )
        context.dispatch = users

        return context
      }
    ],
    get: [],
    create: [
      async context => {
        const { recipient } = context.result

        // Save this entire 'friends' model into the 'users' friends array
        const requester = context.params.user
        context.app.service('users').patch(
          requester,
          { $push: { friends: context.result } }
        )

        // We want to return the 'users' model of the recipient
        const user = await getUserFromFriend(context, recipient)
        context.dispatch = user

        return context
      }
    ],
    update: [],
    patch: [],
    remove: [
      async context => {
        const removedFriend = context.result[0]
        const requester = context.params.user

        // Generate the updated 'users' model for the requester
        const updatedFriendsArray = requester.friends.filter(
          friend => friend.toString() !== removedFriend._id.toString()
        )
        let updatedRequester = requester
        updatedRequester.friends = updatedFriendsArray

        // Remove the 'friends' model from the requester's friends array in their 'users' model
        await context.app.service('users').patch(
          requester,
          updatedRequester
        )

        return context
      }
    ]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

async function getUserFromFriend(context, friend) {
  const userDoc = await context.app.service('users').find({
    query: {
      _id: friend,
      $limit: 1,
      $select: ['_id', 'username', 'personalMessage']
    }
  })
  return userDoc.data[0]
}