const { authenticate } = require('@feathersjs/authentication').hooks;

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
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
    find: [],
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