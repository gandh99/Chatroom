const { authenticate } = require('@feathersjs/authentication').hooks;

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
    find: [async context => {
      let messages = context.result.data
      context.result.data = await Promise.all(messages.map(async message => {
        // Get the users data of the sender and use it to update message.sender
        message.sender = await context.app.service('users').get(
          message.sender,
          { query: { $select: ['username'] } }
        )

        return message
      }))

      return context
    }],
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
