// chatgroup-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'chatgroup';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({

    admins: [{ type: Schema.Types.ObjectId, ref: 'users', required: true }],

    // Refers to non-admins
    members: [{ type: Schema.Types.ObjectId, ref: 'users', required: true }],

    messages: [{ type: Schema.Types.ObjectId, ref: 'message', required: true }],
    isPrivate: { type: Boolean }

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
