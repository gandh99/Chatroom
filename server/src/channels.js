module.exports = function (app) {
  let connections = new Map()

  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('login', (authResult, { connection }) => {
    if (connection) {
      // Save the connection. Key = userId; Value = connection object.
      connections.set(connection.user._id.toString(), connection)

      // Join all the chatgroups belonging to the user in the connection
      const user = connection.user
      const chatgroups = user.chatgroups
      chatgroups.forEach(chatgroup => app.channel(`chatgroups/${chatgroup._id}`).join(connection))
    }
  });

  app.on('disconnect', connection => {
    // Remove the connection
    if (!connection.user) return
    const userId = connection.user._id.toString()
    connections.delete(userId)
  })

  // When a chatgroup is created, create a new channel and subscribe all the participants to it
  app.service('chatgroup').publish('created', chatgroup => {
    const participants = [...chatgroup.admins, ...chatgroup.members]

    participants.forEach(participant => {
      const connection = connections.get(participant._id.toString())
      if (connection) {
        app.channel(`chatgroups/${chatgroup._id}`).join(connection)
      }
    })

    return app.channel(`chatgroups/${chatgroup._id}`).send(chatgroup)
  })

  // When a message is sent, publish to its channel, which sends the data to all subscribed connections
  app.service('message').publish('created', async message => {
    // Update message.sender with the users data of the sender
    message.sender = await app.service('users').get(
      message.sender,
      { query: { $select: ['username'] } }
    )

    return app.channel(`chatgroups/${message.chatgroup}`).send(message)
  })

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};
