// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const usersService = context.app.service('users')
    let chatgroup = context.result

    // Get the users data of the participants
    chatgroup.admins = await getUsersWithRank(usersService, chatgroup.admins)
    chatgroup.members = await getUsersWithRank(usersService, chatgroup.members)

    // Add this chatgroup to all the users
    await addChatgroupToUsers(usersService, chatgroup, chatgroup.admins)
    await addChatgroupToUsers(usersService, chatgroup, chatgroup.members)

    return context;
  };
};

const getUsersWithRank = async (usersService, usersWithRank) => {
  return await Promise.all(
    usersWithRank.map(user => usersService.get(user, { query: { $select: ['username'] } }))
  )
}

const addChatgroupToUsers = async (usersService, chatgroup, users) => {
  await Promise.all(
    users.map(user => {
      usersService.patch(
        user,
        { $push: { chatgroups: chatgroup } }
      )
    })
  )
}