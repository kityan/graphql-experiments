const { dbManager } = require('../dbManager')

// resolvers

// query
const users = async () => await dbManager.getUsers()
const events = async (obj, args, ctx) => await dbManager.getEvents()
const user = async (obj, args) => await dbManager.getUser(args.id)
const event = async (obj, args) => await dbManager.getEvent(args.id)

const createdEvents = async (obj, args) => await dbManager.getUserEvents(obj.id)
const creator = async (obj, args) => await dbManager.getUser(obj.creatorId)

// mutation
const createEvent = async (obj, args) => await dbManager.createEvent(args.eventInput)


module.exports = {
  Event: {
    creator
  },
  User: {
    createdEvents
  },
  Query: {
    events,
    event,
    users,
    user
  },
  Mutation: {
    createEvent,
  }
}

