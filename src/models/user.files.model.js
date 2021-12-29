module.exports = function (app) {
  const modelName = 'user.files';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    fileName: { type: String, required: true },
    userId: { type: String, required: true },
    path: { type: String, required: true },
    contentType: { type: String, required: true }
  }, {
    timestamps: true
  });

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
