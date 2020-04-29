// Initializes the `friends` service on path `/friends`
const { Friends } = require('./friends.class');
const createModel = require('../../models/friends.model');
const hooks = require('./friends.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/friends', new Friends(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('friends');

  service.hooks(hooks);
};
