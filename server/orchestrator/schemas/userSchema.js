const userTypeDefs = `#graphql
  #define schema
  type User {
     _id: ID
     username:String,
     email:String,
     password:String,
     role:String,
     phoneNumber:String,
     address:String
    }

  #response 
   type Message {
     message: String
   }

   #user input
   input UserInput {
    username:String,
    email:String!,
    password:String!,
    phoneNumber:String!,
    address:String!
   }
  
  #write operation(CUD) / hit endpoint
  type Mutation {
    createUser(body: UserInput): Message
    deleteUser(_id: String): Message
  }

  #read operations(R) / hit endpoint
  type Query {
    users: [User]
    user(_id:String): User
  }
`;

module.exports = userTypeDefs;
