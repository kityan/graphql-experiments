// fake DB manager

const dbData = {
  users: [
    { id: 1, email: 'user1@etreniki.ru', name: 'User 1', },
    { id: 2, email: 'user2@etreniki.ru', name: 'User 2', },
  ],
  events: [
    { id: 1, title: 'Event 1', date: '2019-01-05T11:27:21.681Z', creatorId: 1, price: 2.5, },
    { id: 2, title: 'Event 2', date: '2019-02-06T11:27:21.681Z', creatorId: 2, },
    { id: 3, title: 'Event 3', date: '2019-03-07T11:27:21.681Z', creatorId: 1, price: 3, },
  ]
}

const dbManager = {
  getUsers: () => Promise.resolve(dbData.users),
  getEvents: () => Promise.resolve(dbData.events),
  getUserEvents: (id) => Promise.resolve(dbData.events.filter(event => event.creatorId === id)),
  getUser: (id) => {
    const user = dbData.users.find(user => user.id === id)
    return user
      ? Promise.resolve(user)
      : Promise.reject(new Error(`No user for id = ${id}`))
  },
  getEvent: (id) => {
    const event = dbData.events.find(event => event.id === id)
    return event
      ? Promise.resolve(event)
      : Promise.reject(new Error(`No event for id = ${id}`))
  },
  createEvent: async (event) => {
    // just to check if user exists, will throw if not
    // we call dbManager method, so this function should be async
    await dbManager.getUser(event.creatorId)
    // ok, user exists
    const id = dbData.events.length // fake id
    dbData.events.push({ ...event, id })
    return id // will return resolved Promise
  }
}

module.exports = { dbManager, dbData }
