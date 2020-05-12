// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const self = context.params.user
    const { chatgroup } = context.data

    chatgroup.admins = removeFromRank(self, chatgroup.admins)
    chatgroup.members = removeFromRank(self, chatgroup.members)

    context.data = chatgroup
    return context;
  };
};

const removeFromRank = (user, usersWithRank) => {
  return usersWithRank.filter(userWithRank => userWithRank._id !== user._id.toString())
}