// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    const { app, method, result, params } = context;

    const addURI = async message => {
      const uri = await app.service('uploads').get(message.path, params);

      return {
        ...message,
        uri
      }
    }

    if (method === 'find') {
      context.result.data = await Promise.all(result.data.map(addURI));
    } else {

      context.result = await addURI(result);
    }

    return context;
  };
};
