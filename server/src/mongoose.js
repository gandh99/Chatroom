const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function (app) {
  mongoose.connect(
    app.get('mongodb') || process.env.MONGO_URI,
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
  )
    .then(conn => console.log(`MongoDB Connected: ${conn.connection.host}`))
    .catch(err => {
      logger.error(err);
      process.exit(1);
    });

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
