const { authenticate } = require('@feathersjs/authentication').hooks;

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

const getChatgroupsFromIds = async context => {
  const chatgroupIds = context.params.query.chatgroupIds

  if (chatgroupIds) {
    // Retrieve the chatgroups based on their ids
    context.result = await Promise.all(
      chatgroupIds.map(chatgroupId => context.app.service('chatgroup').get(chatgroupId))
    )
  }

  return context
}

const getUsersInChatgroups = async context => {
  let chatgroups = context.result

  // Note: Using forEach to modify the array would not work!
  for (let i = 0; i < chatgroups.length; i++) {
    // Get the ids of the admins and members
    const adminIdArray = chatgroups[i].admins
    const memberIdArray = chatgroups[i].members

    // Get the 'users' model of the participants using their ids
    chatgroups[i].admins = await Promise.all(
      adminIdArray.map(adminId => context.app.service('users').get(adminId, { query: { $select: ['username'] } }))
    )
    chatgroups[i].members = await Promise.all(
      memberIdArray.map(memberId => context.app.service('users').get(memberId, { query: { $select: ['username'] } }))
    )
  }

  return context
}

const getUsersInChatgroup = async context => {
  let chatgroup = context.result

  // Get the ids of the admins and members
  const adminIdArray = chatgroup.admins
  const memberIdArray = chatgroup.members

  // Get the 'users' model of the participants using their ids
  chatgroup.admins = await Promise.all(
    adminIdArray.map(adminId => context.app.service('users').get(adminId, { query: { $select: ['username'] } }))
  )
  chatgroup.members = await Promise.all(
    memberIdArray.map(memberId => context.app.service('users').get(memberId, { query: { $select: ['username'] } }))
  )

  return context
}

const getLastMessageInChatgroups = async context => {
  let chatgroups = context.result

  for (let i = 0; i < chatgroups.length; i++) {
    const messages = chatgroups[i].messages
    let lastMessage = messages[messages.length - 1]
    lastMessage = await context.app.service('message').get(lastMessage)

    // Update the chatgroup data
    chatgroups[i].lastMessage = lastMessage
  }

  // Send the array of chatgroups back
  context.dispatch = chatgroups
  return context
}

const addChatgroupToAllParticipants = async context => {
  const chatgroup = context.result

  // Get all the ids of the participants in the chatgroup
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

async function addChatgroupToUser(context, chatgroup, user) {
  context.app.service('users').patch(
    user,
    { $push: { chatgroups: chatgroup } }
  )
    .catch(err => console.log(err))
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
    find: [getChatgroupsFromIds, getUsersInChatgroups, getLastMessageInChatgroups],
    get: [],
    create: [addChatgroupToAllParticipants, getUsersInChatgroup],
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