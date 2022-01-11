const { AbilityBuilder, Ability } = require('@casl/ability')
const { toMongoQuery } = require('@casl/mongoose')
const { Forbidden } = require('@feathersjs/errors')

function defineAbilitiesFor(user) {

  const { can, build } = new AbilityBuilder(Ability)
  can(['create', 'find', 'get'], 'users')
  if (user) {
    can(
          ['remove', 'patch', 'update'],
          'users',
          {_id: user._id}
        )
  }
  return build()
}

module.exports = (options = {}) => {
  return async context => {

    const action = context.method
    const serviceName = context.path

    const ability = defineAbilitiesFor(context.params.user)

    if (ability.cannot(action, serviceName)) {
      throw new Forbidden(`You are not allowed to ${action} ${serviceName}`)
    }

    const query = toMongoQuery(ability, serviceName, action)
    if (query === null) {
      context.params.query.$limit = 0
    } else {
      Object.assign(context.params.query, query)
    }
    return context
  };
};
