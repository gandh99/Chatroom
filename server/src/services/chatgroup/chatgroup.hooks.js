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
    // Retrieve the chatgroups based on their ids
    const chatgroups = await Promise.all(
      chatgroupIds.map(chatgroupId => context.app.service('chatgroup').get(chatgroupId))
    )

    context.result = chatgroups
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
    const adminUserArray = await Promise.all(
      adminIdArray.map(adminId => context.app.service('users').get(adminId, { query: { $select: ['username'] } }))
    )
    const memberUserArray = await Promise.all(
      memberIdArray.map(memberId => context.app.service('users').get(memberId, { query: { $select: ['username'] } }))
    )

    // Update the admins and members arrays of the chatgroups
    chatgroups[i].admins = adminUserArray
    chatgroups[i].members = memberUserArray
  }

  context.result = chatgroups
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
    create: [addChatgroupToAllParticipants],
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