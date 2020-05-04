// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'users';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const schema = new mongooseClient.Schema({
  
    username: { type: String, maxlength: 15, unique: true },
    password: { type: String },
    personalMessage: { type: String, maxlength: 40, default: 'Hi, I\'m using ChatRoom!'},
    friends: [{ type: Schema.Types.ObjectId, ref: 'friends', required: true }],
    chatgroups: [{ type: Schema.Types.ObjectId, ref: 'chatgroup', required: true }]

  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
