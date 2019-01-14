const { dbManager } = require('../dbManager')
const getFieldNames = require('graphql-list-fields')

const DATALOADER_FAKE_ARGUMENT = 'EMPTY_ARGUMENT'

// queries with DataLoader
const users = (parent, args, context, info) => context.loaders.users.load(DATALOADER_FAKE_ARGUMENT)
const events = (parent, args, context, info) =>  context.loaders.events.load(DATALOADER_FAKE_ARGUMENT)
const user = (parent, args, context, info) => context.loaders.user.load(args.id)
const creator = (parent, args, context, info) => context.loaders.user.load(parent.creatorId)
const createdEvents = (parent, args, context, info) => context.loaders.createdEvents.load(parent.id)
const event = (parent, args, context, info) => context.loaders.event.load(args.id)

// simple for test
const calculateRoute = (parent, args) => {
  const { waypoint0, waypoint1 } = args.calculateRouteInput
  const middleLat = (waypoint0.lat + waypoint1.lat) / 2
  const middleLng = (waypoint0.lng + waypoint1.lng) / 2
  return [
    { lat: waypoint0.lat, lng: waypoint0.lng },
    { lat: middleLat, lng: middleLng },
    { lat: waypoint1.lat, lng: waypoint1.lng },
  ]
}

// mutation
const createEvent = (obj, args) => dbManager.createEvent(args.eventInput)

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
    user,
    calculateRoute,
  },
  Mutation: {
    createEvent,
  }
}
