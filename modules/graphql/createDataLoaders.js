const { dbManager } = require('../dbManager')
const DataLoader = require('dataloader')

module.exports = (cache = true, batch = true) => {

  const user = new DataLoader(dbManager.getUser, { cache, batch })

  const createdEvents = new DataLoader(dbManager.getUserEvents, { cache, batch })

  const event = new DataLoader(dbManager.getEvent, { cache, batch })

  const users = new DataLoader(dbManager.getUsers, { cache, batch })

  const events = new DataLoader(dbManager.getEvents, { cache, batch })

  return {
    user,
    createdEvents,
    event,
    events,
    users
  }

}
