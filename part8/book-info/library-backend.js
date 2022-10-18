const { ApolloServer, gql, UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const jwt = require('jsonwebtoken');
const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');
const JWT_SECRET = 'XXX';

console.log('connecting to', MONGODB_URI);

mongoose
  .connect(env.process.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => console.log('error connection to MongoDB:', error.message));

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genres) {
        return Book.find({});
      } else if (args.author && args.genres) {
        return Book.findOne({
          author: { name: args.author },
          genres: args.genres,
        });
      } else if (args.author) {
        return Book.findOne({ author: { name: args.author } });
      } else if (args.genres) {
        return Book.findOne({ genres: args.genres });
      }
    },
    allAuthors: async () => Author.find({}),
  },
  Author: {
    bookCount: async (root) =>
      Book.findOne({ author: { name: root.name } }).count(),
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    addBook: async (root, args) => {
      const author = Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author, id: uuid() });
      }
      const book = new Book({ ...args, author: { name: args.author } });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    editAuthor: async (root, args) => {
      const author = Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
