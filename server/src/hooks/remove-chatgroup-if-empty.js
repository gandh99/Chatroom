// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const chatgroup = context.result
    const participants = [...chatgroup.admins, ...chatgroup.members]
    
    if (participants.length <= 0) {
      await context.app.service('chatgroup').remove(chatgroup)
    }

    return context;
  };
};
