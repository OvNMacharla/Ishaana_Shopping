const { buildSchema } = require('graphql');

module.exports = buildSchema(`

   type AuthData{
        userId:ID!
        token:String!
        tokenExpiration:Int!
   }

   type Category{
        _id:ID!
        categoryType:String!
   }
   
   type Item{
        _id: ID!
        itemName: String!
        itemDescription: String!
        price: String!
        itemImage: String!
   }

   type ItemList{
        _id: ID!
        itemName: String!
        itemDescription: String!
        price: String!
        itemImage: String!
        category: Category!
   }

   type CartItem{
        _id: ID!
        itemName: String!
        itemDescription: String!
        price: String!
        itemImage: String!
        quantity: String!
   }

   type User{
        _id:ID!
        firstname:String!
        lastname:String!
        username: String!
        email:String!
        password : String!
   }

   type CartItems{
        _id:ID!
        item : Item!
        quantity: String!
   }

   input CategoryInput{
        categoryType:String!
   }

   input UserInput{
        firstname:String!
        lastname:String!
        username: String!
        email:String!
        password : String!
   }

   input ItemInput{
        itemName: String!
        itemDescription: String!
        price: String!
        itemImage: String!
   }
   
   type RootQuery{
        login(email:String!,password:String!): AuthData!
        items : [ItemList!]!
        cartItems: [CartItems!]!
        categories : [Category!]!
   }

   type RootMutation{
        createUser(userInput:UserInput!):User!
        addToCart(itemId:ID!):CartItem!
        removeFromCart(itemId:ID!):CartItem!
        addItems(items:ItemInput!,categoryId:ID!): Item!
        addCategory(categoryInput:CategoryInput!): Category!
   }

   schema{
        query:RootQuery,
        mutation:RootMutation
   } 
`);