const { dbManager } = require('../dbManager')

// we pass dataLoaders created on each new request (to prevent cache mix between requests)
module.exports = _ref => {

  const DATALOADER_FAKE_ARGUMENT = 'EMPTY_ARGUMENT'

  // queries with DataLoader
  const users = () => _ref.loaders.users.load(DATALOADER_FAKE_ARGUMENT)
  const events = () => _ref.loaders.events.load(DATALOADER_FAKE_ARGUMENT)
  const user = (obj, args) => _ref.loaders.user.load(args.id)
  const creator = (obj, args) => _ref.loaders.user.load(obj.creatorId)
  const createdEvents = (obj, args) => _ref.loaders.createdEvents.load(obj.id)
  const event = (obj, args) => _ref.loaders.event.load(args.id)

  // simple for test
  const calculateRoute = (obj, args) => {
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

  return {
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

}
