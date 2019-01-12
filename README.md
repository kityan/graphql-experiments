# NPM
- `npm install` – installation
- `npm start` - run with nodemon
- `npm run schema:get` - download schema from endpoint to file into `./tmp` folder
- `npm run schema:ts` - generate TS types from downloaded file (delete `node_modules/apollo/node_modules/graphq` if fails)

# Fake Database with sample data
`./modules/dbManager.js`

# GraphQL
- schema: `./modules/graphql/schema.gql`
- resolvers for schema: `./modules/graphql/resolvers.js`
- custom types: `./modules/graphql/customScalars.js`

# Endpoint and GraphiQL
http://localhost:3000/api  
This URL also hardcoded for `npm schema:get` 

# Problems
- N+1 problem. Possible solution: https://www.npmjs.com/package/dataloader
  - If we throw an error for in one level, DataLoader will fail whole batch, e.g. (user with id = 21 not exists):
    ~~~~
    { 
      u1: user(id: 2){
        name
      } 
      u2: user(id: 21){
        name
      } 
    }
    ~~~~
- Requesting unnecessary fields from DB. Solution: https://medium.freecodecamp.org/a-5-line-major-efficiency-hack-for-your-graphql-api-type-resolvers-b58438b62864

# Example queries

## Query
### Success

~~~~
{
  calculateRoute(calculateRouteInput: {
    app_id: "APP_ID", 
    app_code: "APP_CODE", 
    waypoint0: {lat: 50, lng: 50}, 
    waypoint1: {lat: 100, lng: 100},
    mode: {
      type: FASTEST
      transportModes: CAR
      trafficMode: ENABLED
      someEnum: [ONE, TWO]
    }
  }) {
    lat
    lng
  }
}
~~~~

~~~~
query {
  events {
    date
    creator {
      createdEvents {
        creator {
          createdEvents {
            creator {
              createdEvents {
                id
              }
            }
          }
        }
      }
    }
  }
}
~~~~



## Mutations
### Fail
~~~~
mutation {
  createEvent(eventInput:{
    title: "123", 
    description: "123", 
    price: 0, 
    date: "2019-01-06T12:36:56.715Z", 
    creatorId: 2
  })
}
~~~~

~~~~
mutation {
  createEvent(
    eventInput:{
      title: "123", 
      description: "123", 
      price: 0, 
      date: "2019-01-06T12:36:56.715Z", 
      creatorId: 123
  })
}
~~~~
### Success
~~~~ 
mutation {
  createEvent(eventInput:{
    title: "123", 
    description: "123", 
    price: 0,
    date: "2019-01-06T12:36:56.715Z", 
    creatorId: 1
  })
}
~~~~

