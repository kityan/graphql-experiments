// fake DB manager

const dbData = {
  users: [
    { id: 1, email: 'user1@etreniki.ru', name: 'User 1', },
    { id: 2, email: 'user2@etreniki.ru', name: 'User 2', },
  ],
  events: [
    { id: 1, title: 'Event 1', description: 'sample', date: '2019-01-05T11:27:21.681Z', creatorId: 1, price: 2.5, },
    { id: 2, title: 'Event 2', description: 'sample', date: '2019-02-06T11:27:21.681Z', creatorId: 2, },
    { id: 3, title: 'Event 3', description: 'sample', date: '2019-03-07T11:27:21.681Z', creatorId: 1, price: 3, },
  ]
}

// helper to convert result for DataLoader
const _prepare = ids => {
  const result = ids.map(id => [])
  const indexOfId = {}
  // map indexes to speed up
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i]
    if (!indexOfId[id]) { indexOfId[id] = [] }
    indexOfId[id].push(i)
  }
  return { indexOfId, result }
}

const _toArray = val => {
  if (!Array.isArray(val)) {
    return [val]
  }
  return val
}


// fake DB manager
const dbManager = {
  getUsers: (args) => Promise.resolve(args.map(() => dbData.users)),
  getEvents: (args) => Promise.resolve(args.map(() => dbData.events)),

  getUserEvents: (ids) => {
    ids = _toArray(ids)
    const response = dbData.events.filter(item => ids.includes(item.creatorId))
    const { result, indexOfId } = _prepare(ids)
    // DataLoader can call with duplicated ids in array if DataLoader caching is disabled:
    response.forEach(item => indexOfId[item.creatorId].forEach(index => result[index].push(item)))
    return Promise.resolve(result)
  },


  getUser: (ids) => {
    ids = _toArray(ids)

    const response = dbData.users.filter(item => ids.includes(item.id))

    const { result, indexOfId } = _prepare(ids)

    // DataLoader can call with duplicated ids in array if DataLoader caching is disabled:
    response.forEach(item => indexOfId[item.id].forEach(index => result[index] = item))

    // check notFound
    const notFoundIds = result.reduce((arr, r, i) => {
      if (r.length === 0) { arr.push(ids[i]) }
      return arr
    }, [])

    if (notFoundIds.length) {
      // warning! Such reject will fail the whole DataLoader's batch
      return Promise.reject(new Error(`No user for id = ${notFoundIds.join(', ')}`))
    }

    return Promise.resolve(result)
  },

  getEvent: (ids) => {
    ids = _toArray(ids)

    const response = dbData.events.filter(item => ids.includes(item.id))

    const { result, indexOfId } = _prepare(ids)

    // DataLoader can call with duplicated ids in array if DataLoader caching is disabled:
    response.forEach(item => indexOfId[item.id].forEach(index => result[index] = item))

    // check notFound
    const notFoundIds = result.reduce((arr, r, i) => {
      if (r.length === 0) { arr.push(ids[i]) }
      return arr
    }, [])

    if (notFoundIds.length) {
      // warning! Such reject will fail the whole DataLoader's batch
      return Promise.reject(new Error(`No event for id = ${notFoundIds.join(', ')}`))
    }

    return Promise.resolve(result)
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

let wrapped = {}
// wrap for logging
Object.keys(dbManager).forEach(key => {
  wrapped[key] = (...args) => {
    console.log(`Call dbManager.${key}(${args.join(', ')})`)
    return dbManager[key].apply(this, args)
  }
})


module.exports = { dbManager: wrapped, dbData }
