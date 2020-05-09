const { authenticate } = require('@feathersjs/authentication').hooks;
const addChatgroupUsers = require('../../hooks/add-chatgroup-users')
const getChatGroupsData = require('../../hooks/get-chatgroups-data')

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
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [getChatGroupsData()],
    get: [],
    create: [addChatgroupUsers()],
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