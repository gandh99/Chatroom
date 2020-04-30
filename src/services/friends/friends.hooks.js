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
        const user = await getUserFromFriend(context, recipient)
        context.dispatch = user

        return context
      }
    ],
    update: [],
    patch: [],
    remove: []
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
      $select: ['_id', 'username']
    }
  })
  return userDoc.data[0]
}