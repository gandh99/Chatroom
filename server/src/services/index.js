const users = require('./users/users.service.js');
const friends = require('./friends/friends.service.js');
const chatgroup = require('./chatgroup/chatgroup.service.js');
const message = require('./message/message.service.js');
const friendsUsers = require('./friends-users/friends-users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(friends);
  app.configure(chatgroup);
  app.configure(message);
  app.configure(friendsUsers);
};
