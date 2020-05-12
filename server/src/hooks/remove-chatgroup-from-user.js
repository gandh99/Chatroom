// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const self = context.params.user
    const chatgroup = context.result

    self.chatgroups = self.chatgroups.filter(group => group._id.toString() !== chatgroup._id.toString())
    await context.app.service('users').update(self, self)

    return context;
  };
};
