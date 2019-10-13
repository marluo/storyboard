const { buildSchema } = require("graphql");

module.exports = buildSchema(`
        type Room {
            _id: ID!
            event: Event!
            user: User!
            createdAt: String!
            updatedAt: String!
        }
       
        type RootQuery {
            events: [Event!]!
            getEvent(eventId: ID!): Event!
            bookings: [Booking!]!
            login(email: String!, password: String!): AuthData!
            getUser(userId: ID!):User!
            getAuthUser: User!
        }
        type mutation {
            createEvent(eventInput: EventInput): Event
            createRoom(createRoom: RoomInput) : Room
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `);
