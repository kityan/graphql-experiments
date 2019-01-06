# NPM
- `npm install` – installation
- `npm start` - run with nodemon
- `npm run schema:get` - download schema from endpoint to file into `./tmp` folder
- `npm run schema:ts` - generate TS types from downloaded file

# Fake Database with sample data
`./modules/dbManager.js`

# GraphQL
- schema: `./modules/graphql/schema.gql`
- resolvers for schema: `./modules/graphql/resolvers.js`
- custom types: `./modules/graphql/customScalars.js`

# Endpoint and GraphiQL
http://localhost:3000/api  
This URL also hardcoded for `npm schema:get` 

# Example queries

## Query
### Success
- `query {
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
}`

## Mutations
### Fail
- `
mutation {
  createEvent(eventInput:{title: "123", description: "123", price: 0, date: "2019-01-06T12:36:56.715Z", creatorId: 2})
}
`
- `
mutation {
  createEvent(eventInput:{title: "123", description: "123", price: 0, date: "2019-01-06T12:36:56.715Z", creatorId: 123})
}
`
### Success
- `mutation {
  createEvent(eventInput:{title: "123", description: "123", price: 0, date: "2019-01-06T12:36:56.715Z", creatorId: 1})
}`

