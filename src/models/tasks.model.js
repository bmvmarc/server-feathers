module.exports = function (app) {
  const modelName = 'tasks';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    title: { type: String, required: true },

    date: { type: String, required: false },
    user_id: { type: String, required: true },
    completed: { type: Boolean, required: true }

  }, {
    timestamps: true
  });

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
