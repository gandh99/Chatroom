/* eslint-disable no-unused-vars */
exports.FriendsUsers = class FriendsUsers {
  constructor(options) {
    this.options = options || {};
  }

  async find(params) {
    const requester = params.user

    // Get the user
    const user = await this.app.service('users').get(requester)

    // Get all the friends
    const friends = await Promise.all(
      user.friends.map(friend =>
        this.app.service('friends').get(friend)
      )
    )

    // Get the users of all the friends
    const friendsUsers = await Promise.all(
      friends.map(friend => (
        this.app.service('users').get(friend.recipient, {
          query: {
            $select: ['username', 'personalMessage']
          }
        })
      ))
    )

    return friendsUsers;
  }

  async get(id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    const { requester, recipient } = data

    // Create the friend
    const friend = await this.app.service('friends').create({ requester, recipient })

    // Add this friends object to the requester's friends array
    await this.app.service('users').patch(
      requester,
      { $push: { friends: friend } }
    )

    return recipient;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    const { friends } = params   // this is the friends model, NOT the recipient
    const requester = params.user
    const recipient = id

    // Remove the friend
    await this.app.service('friends').remove(friends)

    // Remove the recipient from the requester's friends array
    requester.friends = requester.friends.filter(friend => friend.toString() !== friends._id.toString())
    this.app.service('users').patch(requester._id, requester)

    return recipient;
  }

  async setup(app, path) {
    this.app = app
  }
};
