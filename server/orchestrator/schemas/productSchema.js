const productTypeDefs = `#graphql
  #define schema
  type Product {
    id: ID,
    name: String,
    slug: String,
    description:  String,
    price: Int,
    mainImg: String,
    userMongoId: String
    Images: [Image]
    Category: Category
    }

  type Image {
    id: ID
    imgUrl: String
  }
  

   type Category {
     id: ID,
     name: String
   }


  type ProductById {
    id: ID,
    name: String,
    slug: String,
    description:  String,
    price: Int,
    mainImg: String,
    userMongoId: String
    Images: [Image]
    Category: Category
    User: User
    }

   type User {
    id: ID, 
    username: String, 
    email: String, 
    role: String, 
    phoneNumber: String, 
    address: String
   }

  #response 
   type Message {
     message: String
   }

  #product input
   input ProductInput {
    id: ID,
    name: String,
    slug: String,
    description:  String,
    price: Int,
    mainImg: String,
    Images: [ImageInput]
    userMongoId: String
    categoryId: Int
   }

   input ImageInput {
    imgUrl: String
   }

  #write operation(CUD) / hit endpoint
  type Mutation {
    createProduct(body: ProductInput): Message
    updateProduct(id: ID, body: ProductInput): Message
    deleteProduct(id: ID): Message
  }

  #read operations(R) / hit endpoint
  type Query {
    categories: [Category]
    products: [Product]
    product(id: ID): ProductById
    
  }
`;

module.exports = productTypeDefs;
