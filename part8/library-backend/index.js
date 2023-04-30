const { ApolloServer } = require('@apollo/server')
const mongoose = require('mongoose')
const { GraphQLError } = require('graphql')
const { startStandaloneServer } = require('@apollo/server/standalone')

mongoose.set('strictQuery', false)

const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
})

const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int,
    bookCount: Int
  }

  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String]!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book]!,
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async (root) => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({})

      if(args.author !== undefined){
        return books.filter(b => b.author === args.author)
      }

      if(args.genre !== undefined){
        return books.filter(b => b.genres.includes(args.genre))
      }

      return books
    },
    allAuthors: async () => await Author.find({})
  },

  Author: {
    bookCount: root => Book.countDocuments({ author: root.name })
  },

  Mutation:{
    addBook: async (root, args) => {
      const authorExists = await Author.findOne({ name: args.author })

      if(!authorExists){
        const newAuthor = new Author({ "name": args.author })

        try{
          await newAuthor.save()
        }catch(error){
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      }

      const foundAuthor = await Author.findOne({ name: args.author })
      const newBook = new Book({...args, author: foundAuthor})

      try {
        const response = await newBook.save()
        return response
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      if(!author){
        return null
      }

      try {
        return await author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})