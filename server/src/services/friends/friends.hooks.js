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

const addToRequesterFriendsArray = async context => {
  const { requester } = context.data
  const friend = context.result
  await context.app.service('users').addToFriendsArray(requester, friend)

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

const returnFriendIdFromRecipientId = async context => {
  const recipient = context.id
  const friendsResult = await context.app.service('friends').find({ query: { recipient } })

  context.id = friendsResult.data[0]._id
  return context
}

const removeFromRequesterFriendsArray = async context => {
  const requester = context.params.user
  const removedFriend = context.result
  await context.app.service('users').removeFromFriendsArray(requester, removedFriend)

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
    remove: [returnFriendIdFromRecipientId]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [getUserModelFromFriend],
    get: [],
    create: [addToRequesterFriendsArray],
    update: [],
    patch: [],
    remove: [removeFromRequesterFriendsArray]
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