const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Post {
    id: ID!
    body: String!
    createdAt: String!
    title: String
    category: String
    comments: [Comment]
    likes: [Like]
    likeCount: Int
    commentCount: Int
    userId: User!
  }

  type Comment {
    id: ID!
    createdAt: String!
    userId: ID!
    body: String!
  }

  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }

  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

type Query {
  users: [User]
  user(id: ID!): User
  me: User
  getUsers: [User]
  searchTitle: Post
  getPosts: [Post]
  getPost(postId: ID!): Post
}

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    register(registerInput: RegisterInput): User!
    createPost(userId: ID!, body: String!, title: String): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!, userId: ID!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;

module.exports = typeDefs;


// The register mutation is not defined in the typeDefs, but it is mentioned in the resolvers object. This could cause an error if this mutation is called.

// The getPost query is not defined in the typeDefs, but it is mentioned in the resolvers object. This could cause an error if this query is called.