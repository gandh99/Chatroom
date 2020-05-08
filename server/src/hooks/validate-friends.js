// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { BadRequest } = require('@feathersjs/errors')

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const app = context.app
    const { requester, recipient } = context.data

    // Error: Recipient is the same as the requester
    if (requesterAndRecipientAreEqual(requester, recipient)) {
      throw new BadRequest('You cannot add yourself as a friend.')
    }

    // Error: User is already added as a friend
    if (await friendAlreadyExists(app, requester, recipient)) {
      throw new BadRequest('User is already a friend.')
    }

    return context;
  };
};

function requesterAndRecipientAreEqual(requester, recipient) {
  return requester.username === recipient.username
}

async function friendAlreadyExists(app, requester, recipient) {
  const friendResult = await app.service('friends').find({
    query: { requester, recipient }
  })
  return friendResult.total > 0
}