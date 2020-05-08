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

  // Save this entire 'friends' model into the 'users' friends array
  context.app.service('users').patch(
    requester,
    { $push: { friends: friend } }
  )

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

const removeFriendFromUserModel = async context => {
  const removedFriend = context.result[0]
  const requester = context.params.user

  // Remove the friend from the friends array
  // This is to create the updated 'users' model for the requester
  const updatedFriendsArray = requester.friends.filter(
    friend => friend.toString() !== removedFriend._id.toString()
  )
  let updatedRequester = requester
  updatedRequester.friends = updatedFriendsArray

  // Update the 'users' model of the requester
  await context.app.service('users').patch(
    requester,
    updatedRequester
  )

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
    remove: [removeFriendFromUserModel]
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