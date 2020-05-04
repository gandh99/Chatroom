// Initializes the `chatgroup` service on path `/chatgroup`
const { Chatgroup } = require('./chatgroup.class');
const createModel = require('../../models/chatgroup.model');
const hooks = require('./chatgroup.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/chatgroup', new Chatgroup(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('chatgroup');

  service.hooks(hooks);
};
