const { authenticate } = require('@feathersjs/authentication').hooks;

const getChatgroupIdsOfUser = async context => {
  const user = context.params.user
  const chatgroupsDocument = await context.app.service('users').find({
    query: {
      _id: user,
      $select: ['chatgroups']
    }
  })
  const chatgroupIds = chatgroupsDocument.data[0].chatgroups

  // Add the chatgroups array (comprising only the ids) to the query
  context.params.query.chatgroupIds = chatgroupIds

  return context
}

const getChatgroupsFromIds = async context => {
  const chatgroupIds = context.params.query.chatgroupIds

  if (chatgroupIds) {
    const chatgroups = await Promise.all(
      chatgroupIds.map(chatgroupId => context.app.service('chatgroup').get(chatgroupId))
    )
    // Send the array of chatgroups back
    context.dispatch = chatgroups
  }

  return context
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [getChatgroupIdsOfUser],
    get: [],
    create: [
      async context => {
        // Set the admin
        const creator = context.params.user
        context.data.admins = [creator]

        return context
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [getChatgroupsFromIds],
    get: [],
    create: [
      async context => {
        const chatgroup = context.result

        // Get all the participants in the chatgroup
        const participants = [...chatgroup.admins, ...chatgroup.members]  // contains only ids, not objects
        let users = await Promise.all(
          participants.map(participant =>
            context.app.service('users').get(participant)
          )
        )

        // Add the chatgroup to all the participants' 'users' model
        await Promise.all(
          users.map(user => {
            addChatgroupToUser(context, chatgroup, user)
          })
        )

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

async function addChatgroupToUser(context, chatgroup, user) {
  context.app.service('users').patch(
    user,
    { $push: { chatgroups: chatgroup } }
  )
    .catch(err => console.log(err))
}