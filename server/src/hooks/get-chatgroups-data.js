// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const { getUsersWithRank } = require('./add-chatgroup-users')

module.exports = (options = {}) => {
  return async context => {
    const chatgroupService = context.app.service('chatgroup')
    const usersService = context.app.service('users')
    const messageService = context.app.service('message')
    const chatgroupIds = context.params.query.chatgroupIds

    // Get all chatgroups belonging to the user
    let chatgroups = await getChatgroupsFromIds(chatgroupService, chatgroupIds)

    for (let i = 0; i < chatgroups.length; i++) {
      // Add the user data for the participants in the chatgroup
      const { admins, members } = await getUsersInChatgroup(usersService, chatgroups[i])
      chatgroups[i].admins = admins
      chatgroups[i].members = members

      // Add the last message for each chatgroup
      const lastMessage = await getLastMessageInChatgroup(messageService, chatgroups[i])
      chatgroups[i].lastMessage = lastMessage
    }

    context.dispatch = chatgroups
    return context;
  };
};

const getChatgroupsFromIds = async (chatgroupService, chatgroupIds) => {
  return await Promise.all(
    chatgroupIds.map(chatgroupId => chatgroupService.get(chatgroupId))
  )
}

const getUsersInChatgroup = async (usersService, chatgroup) => {
  const admins = await getUsersWithRank(usersService, chatgroup.admins)
  const members = await getUsersWithRank(usersService, chatgroup.members)
  return { admins, members }
}

const getLastMessageInChatgroup = async (messageService, chatgroup) => {
    const messages = chatgroup.messages
    const lastMessage = messages[messages.length - 1]
    return await messageService.get(lastMessage)
}