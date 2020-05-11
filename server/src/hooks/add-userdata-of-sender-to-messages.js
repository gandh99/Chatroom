// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    let messages = context.result.data
    context.result.data = await Promise.all(messages.map(async message => {
      // Get the users data of the sender and use it to update message.sender
      message.sender = await context.app.service('users').get(
        message.sender,
        { query: { $select: ['username'] } }
      )

      return message
    }))

    return context;
  };
};
