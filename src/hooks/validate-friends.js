// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { NotFound, BadRequest } = require('@feathersjs/errors')
let application

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { app, data, params } = context
    application = app

    // Set the requester. Refers to the user who issued this request.
    const requester = params.user

    // Username refers to the username of the friend (i.e. recipient).
    const { username } = data

    // Error: Recipient is the same as the requester
    if (requesterAndRecipientAreEqual(requester.username, username)) {
      throw new BadRequest('You cannot add yourself as a friend.')
    }

    // Error: User does not exist
    if (await userDoesNotExist(username)) {
      throw new NotFound('User does not exist.')
    }

    // TODO: Set the recipient
    const recipient = await getUserFromUsername(username)
    context.data.recipient = recipient

    // Error: User is already added as a friend
    if (await friendAlreadyExists(requester, recipient)) {
      throw new BadRequest('User is already a friend.')
    }

    return context;
  };
};

function requesterAndRecipientAreEqual(requesterUsername, recipientUsername) {
  return requesterUsername === recipientUsername
}

async function userDoesNotExist(username) {
  const userDocument = await application.service('users').find({
    query: {
      username,
      $limit: 1
    }
  })
  return userDocument.total <= 0
}

async function friendAlreadyExists(requester, recipient) {
  const existingFriendDoc = await application.service('friends').findByParams({
    requester, recipient
  })
  return existingFriendDoc.total > 0
}

async function getUserFromUsername(username) {
  const recipientDocument = await application.service('users').find({
    query: {
      username,
      $limit: 1,
    }
  })
  return recipientDocument.data[0]
}