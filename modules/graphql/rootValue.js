const { dbManager } = require('../dbManager')

const transformers = {
  user: user => ({
    ...user,
    createdEvents: resolvers.getUserEvents.bind(null, { id: user.id })
  }),
  event: event => ({
    ...event,
    creator: resolvers.getUser.bind(null, { id: event.creatorId })
  })
}

const resolvers = {
  getUsers: async (args) => (await dbManager.getUsers()).map(transformers.user),
  getEvents: async (args) => (await dbManager.getEvents()).map(transformers.event),
  getUserEvents: async (args) => (await dbManager.getUserEvents(args.id)).map(transformers.event),
  getUser: async (args) => transformers.user(await dbManager.getUser(args.id)),
  getEvent: async (args) => transformers.event(await dbManager.getEvent(args.id)),

  createEvent: async (args) => await dbManager.createEvent(args.eventInput)
  // not necessary to use async/await, we can just return Promise from dbManager.createEvent()
  // createEvent: (args) =>  dbManager.createEvent(args.eventInput)
}

module.exports = {
  events: resolvers.getEvents,
  event: resolvers.getEvent,
  createEvent: resolvers.createEvent,
  user: resolvers.getUser,
  users: resolvers.getUsers,
}
