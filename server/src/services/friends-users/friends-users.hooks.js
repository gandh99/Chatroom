const { authenticate } = require('@feathersjs/authentication').hooks;
const { BadRequest } = require('@feathersjs/errors')
const validateFriends = require('../../hooks/validate-friends');

const getRequester = async context => {
  const requester = context.params.user
  context.data.requester = requester
  return context
}

const getRecipient = async context => {
  const { username } = context.data.query
  const recipientResult = await context.app.service('users').find({ query: { username } })
  if (recipientResult.total <= 0) throw BadRequest('User does not exist.')

  context.data.recipient = recipientResult.data[0]
  return context
}

const getFriendFromRecipient = async context => {
  const recipient = context.id
  const friendsResult = await context.app.service('friends').find({ query: { recipient } })

  context.params.friends = friendsResult.data[0]
  return context
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [getRequester, getRecipient, validateFriends()],
    update: [],
    patch: [],
    remove: [getFriendFromRecipient]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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
