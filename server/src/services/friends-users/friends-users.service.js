// Initializes the `friends-users` service on path `/friends-users`
const { FriendsUsers } = require('./friends-users.class');
const hooks = require('./friends-users.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/friends-users', new FriendsUsers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('friends-users');

  service.hooks(hooks);
};
