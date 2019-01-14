const { dbManager } = require('../dbManager')
const DataLoader = require('dataloader')

module.exports = (context, cache = true, batch = true) => {

  const options = { cache, batch }

  const user = new DataLoader(arg => dbManager.getUser(arg, context), options)
  const createdEvents = new DataLoader(arg => dbManager.getUserEvents(arg, context), options)
  const event = new DataLoader(arg => dbManager.getEvent(arg, context), options)
  const users = new DataLoader(arg => dbManager.getUsers(arg, context), options)
  const events = new DataLoader(arg => dbManager.getEvents(arg, context), options)


  return {
    user,
    createdEvents,
    event,
    events,
    users
  }

}
