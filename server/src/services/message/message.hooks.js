const { authenticate } = require('@feathersjs/authentication').hooks;
const addUserDataOfSenderToMessages = require('../../hooks/add-userdata-of-sender-to-messages')

const addMessageToChatgroup = async context => {
  const { chatgroup } = context.data
  const message = context.result

  // Add the message to the chatgroup's messages array
  await context.app.service('chatgroup').patch(
    chatgroup,
    { $push: { messages: message } }
  )

  return context
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [addUserDataOfSenderToMessages()],
    get: [],
    create: [addMessageToChatgroup],
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
