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
      // TODO
      async context => {
        const friendsArray = context.result.data

        const usersDoc = await Promise.all(
          friendsArray.map(friend => (
            context.app.service('users').find({
              query: {
                _id: friend.recipient,
                $limit: 1,
                $select: ['_id', 'username']
              }
            })
          ))
        )
        const users = usersDoc.map(user => user.data[0])
        context.dispatch = users

        return context
      }
    ],
    get: [],
    create: [
      // TODO
      async context => {
        const { recipient } = context.result
        const recipientUserDoc =
          await context.app.service('users').find({
            query: {
              _id: recipient,
              $limit: 1,
              $select: ['_id', 'username']
            }
          })

        context.dispatch = recipientUserDoc.data[0]

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
