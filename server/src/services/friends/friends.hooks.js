const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  protect
} = require('@feathersjs/authentication-local').hooks;

const validateFriends = require('../../hooks/validate-friends');

const getRequester = async context => {
  const requester = context.params.user
  context.data.requester = requester
  return context
}

const addFriendToRequester = async context => {
  const { requester } = context.data
  const friend = context.result
  context.app.service('users').addToFriendsArray(requester._id, friend)

  return context
}

const getUserModelFromFriend = async context => {
  const friendsArray = context.result.data

  // Get and return the 'users' model of every recipient in the friendsArray
  const users = await Promise.all(
    friendsArray.map(friends => (
      context.app.service('users').get(friends.recipient, {
        query: {
          $select: ['username', 'personalMessage']
        }
      })
    ))
  )
  context.dispatch = users

  return context
}

const removeFriendFromRequester = async context => {
  const requesterId = context.params.user._id
  const removedFriend = context.result[0]
  context.app.service('users').removeFromFriendsArray(requesterId, removedFriend)

  return context
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [getRequester, validateFriends()],
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
    find: [getUserModelFromFriend],
    get: [],
    create: [addFriendToRequester],
    update: [],
    patch: [],
    remove: [removeFriendFromRequester]
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