const { authenticate } = require('@feathersjs/authentication').hooks;
const addChatgroupUsers = require('../../hooks/add-chatgroup-users')
const getChatgroupsData = require('../../hooks/get-chatgroups-data')
const removeUserFromChatgroup = require('../../hooks/remove-user-from-chatgroup')
const removeChatgroupFromUser = require('../../hooks/remove-chatgroup-from-user')
const removeChatgroupIfEmpty = require('../../hooks/remove-chatgroup-if-empty')

const setAdmin = async context => {
  const creator = context.params.user
  context.data.admins = [creator]
  return context
}

const getChatgroupIdsOfUser = async context => {
  const user = context.params.user
  const chatgroupsDocument = await context.app.service('users').get(user, {
    query: {
      $select: ['chatgroups']
    }
  })
  // Add the chatgroups array (comprising only the ids) to the query
  context.params.query.chatgroupIds = chatgroupsDocument.chatgroups

  return context
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [getChatgroupIdsOfUser],
    get: [],
    create: [setAdmin],
    update: [removeUserFromChatgroup()],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [getChatgroupsData()],
    get: [],
    create: [addChatgroupUsers()],
    update: [removeChatgroupFromUser(), removeChatgroupIfEmpty()],
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