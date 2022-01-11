// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {

    const res = await context.app.service('user-files').create({
      fileName: context.data.name,
      userId: context.params.user._id,
      path: context.result.id,
      contentType: context.result.contentType
    })
    return context;

  };
};
