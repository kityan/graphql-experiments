const { dbManager } = require('../dbManager')

// resolvers

// query
const users = async () => await dbManager.getUsers()
const events = async (obj, args, ctx) => await dbManager.getEvents()
const user = async (obj, args) => await dbManager.getUser(args.id)
const event = async (obj, args) => await dbManager.getEvent(args.id)

const createdEvents = async (obj, args) => await dbManager.getUserEvents(obj.id)
const creator = async (obj, args) => await dbManager.getUser(obj.creatorId)

// simple for test
const calculateRoute = async (obj, args) => {
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
    user,
    calculateRoute,
  },
  Mutation: {
    createEvent,
  }
}


